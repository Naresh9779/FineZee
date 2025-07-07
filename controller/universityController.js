const University = require('../models/universityModel'); 

const factory=require('../controller/factoryController')


exports.getUniversities = factory.getAll(University);

exports.addUniversity = factory.createOne(University);

exports.updateUniversity = factory.updateOne(University)

exports.getUniversity=factory.getOne(University);

exports.updateUniversity=factory.updateOne(University);

exports.deleteUniversity=factory.deleteOne(University);