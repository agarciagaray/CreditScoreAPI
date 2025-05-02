const mongoose = require('mongoose');

const evaluacionSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    decision: {
        type: String,
        required: true,
        enum: ['APROBADO', 'APROBADO_CON_AJUSTE', 'RECHAZADO']
    },
    score: {
        type: Number,
        required: true
    },
    percentile: {
        type: Number,
        required: true
    },
    factors: [{
        type: String
    }],
    maxAmount: {
        type: Number,
        required: true
    },
    recommendedTerm: {
        type: Number,
        required: true
    },
    monthlyPayment: {
        type: Number,
        required: true
    },
    adjustedMonthlyPayment: {
        type: Number
    },
    evaluationId: {
        type: String,
        required: true,
        unique: true
    },
    loanAmount: {
        type: Number,
        required: true
    },
    loanTerm: {
        type: Number,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    modelVersion: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Evaluacion', evaluacionSchema);