const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    documentType: {
        type: String,
        required: true,
        enum: ['CC', 'CE', 'TI', 'PP']
    },
    documentNumber: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    monthlyIncome: {
        type: Number,
        required: true
    },
    monthlyExpenses: {
        type: Number,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    yearsEmployed: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true,
        enum: ['bachiller', 'tecnico', 'profesional', 'postgrado']
    },
    maritalStatus: {
        type: String,
        required: true,
        enum: ['soltero', 'casado', 'divorciado', 'viudo', 'unionLibre']
    },
    dependents: {
        type: String,
        required: true
    },
    housingType: {
        type: String,
        required: true,
        enum: ['propia', 'renta', 'familiar']
    },
    creditScore: {
        type: String,
        required: true
    },
    overdueDebts: {
        type: String,
        required: true
    },
    activeObligations: {
        type: String,
        required: true
    },
    totalDebt: {
        type: String,
        required: true
    },
    evaluaciones: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evaluacion'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Cliente', clienteSchema);