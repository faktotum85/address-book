const mongoose = require('mongoose');
const Person = mongoose.model('Person');

exports.getPersons = async (req, res) => {
    console.log(req.query);
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;
    const persons = await Person.find().skip(offset).limit(limit);
    res.send(persons);
};

exports.getPerson = async (req, res) => {
    const person = await Person.findById(req.params.id);
    res.send(person);
};

exports.editPerson = async (req, res) => {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(person);
};

exports.createPerson = async (req, res) => {
    const person = await new Person(req.body).save();
    res.send(person);
};

exports.deletePerson = async (req, res) => {
    const result = await Person.findByIdAndRemove(req.params.id);
    res.send(result);
};