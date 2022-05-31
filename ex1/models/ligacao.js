var mongoose = require('mongoose');

var LigacaoSchema = new mongoose.Schema({
    _id: String,
    id: String,
    origem: String,
    destino: String,
    distância: Number
});

module.exports = mongoose.model('ligacoe', LigacaoSchema);