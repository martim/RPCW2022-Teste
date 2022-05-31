var mongoose = require('mongoose');

var CidadeSchema = new mongoose.Schema({
    _id: String,
    id: String,
    nome: String,
    população: Number,
    descrição: String,
    distrito: String
});

module.exports = mongoose.model('cidade', CidadeSchema);