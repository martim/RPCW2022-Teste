var mongoose = require('mongoose')
var Cidade = require('../models/cidade')

module.exports.list = () => {
    return Cidade
        .find({}, { _id: 0, id: 1, nome: 1, distrito: 1 })
        .exec()
}

module.exports.lookUp = (id) => {
    return Cidade
        .findOne({ id: id })
        .exec()
}

module.exports.listNames = () => {
    return Cidade
        .find({}, { _id: 0, nome: 1 })
        .sort({ nome: 1 })
        .exec()
}

module.exports.lookUpDistrict = (district) => {
    var district = new RegExp(district)
    return Cidade
        .find({ distrito: district }, { _id: 0, id: 1, nome: 1 })
        .exec()
}
