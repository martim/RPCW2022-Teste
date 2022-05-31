var mongoose = require('mongoose')
var Ligacao = require('../models/ligacao')

module.exports.list = () => {
    return Ligacao
        .find({}, {})
        .exec()
}

module.exports.lookUpSource = (source) => {
    return Ligacao
        .find({}, { _id: 0, id: 1, destino: 1 })
        .exec()
}