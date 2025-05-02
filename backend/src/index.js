require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/credito-evaluator', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch((error) => {
    console.error('Error conectando a MongoDB:', error);
});

// Importar modelos
const Cliente = require('./models/Cliente');
const Evaluacion = require('./models/Evaluacion');

// Rutas
app.post('/api/evaluaciones', async (req, res) => {
    try {
        const { clientData, evaluationData } = req.body;

        // Buscar si el cliente ya existe o crear uno nuevo
        let cliente = await Cliente.findOne({ documentNumber: clientData.documentNumber });

        if (!cliente) {
            cliente = new Cliente(clientData);
            await cliente.save();
        }

        // Crear la evaluación vinculada al cliente
        const evaluacion = new Evaluacion({
            ...evaluationData,
            cliente: cliente._id,
            loanAmount: clientData.loanAmount,
            loanTerm: clientData.loanTerm,
            interestRate: clientData.interestRate,
            purpose: clientData.purpose
        });

        await evaluacion.save();

        // Actualizar la lista de evaluaciones del cliente
        cliente.evaluaciones.push(evaluacion._id);
        await cliente.save();

        res.status(201).json({ evaluacion, cliente });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al guardar la evaluación y el cliente' });
    }
});

app.get('/api/evaluaciones', async (req, res) => {
    try {
        const evaluaciones = await Evaluacion.find()
            .populate('cliente')
            .sort({ timestamp: -1 });
        res.json(evaluaciones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las evaluaciones' });
    }
});

app.get('/api/clientes/:documentNumber/evaluaciones', async (req, res) => {
    try {
        const cliente = await Cliente.findOne({ documentNumber: req.params.documentNumber })
            .populate('evaluaciones');

        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // res.json(cliente.evaluaciones);
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las evaluaciones del cliente' });
    }
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});