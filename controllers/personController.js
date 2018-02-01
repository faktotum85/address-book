const mongoose = require('mongoose');
const Person = mongoose.model('Person');

exports.getPersons = async (req, res) => {
    const persons = await Person.find();
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