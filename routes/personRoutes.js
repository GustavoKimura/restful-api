const router = require('express').Router();
const MongooseTypes = require('mongoose').Types;

const Person = require('../models/Person');

router.post('/', async (request, response) => {
    const {name, salary, approved} = request.body;

    const person = {name, salary, approved};

    if (name === undefined) {
        response.status(422).json({error: 'O nome é obrigatório.'});

        return;
    }

    if (salary === undefined) {
        response.status(422).json({error: 'O salário é obrigatório.'});

        return;
    }

    if (approved === undefined) {
        response.status(422).json({error: 'A aprovação é obrigatória.'});

        return;
    }

    try {
        await Person.create(person);

        response.status(201).json({message: 'Pessoa inserida no sistema com SUCESSO.'});
    } catch (error) {
        response.status(500).json({error: error.message});
    }
});

router.get('/', async (request, response) => {
    try {
        const people = await Person.find();

        response.status(200).json(people);
    } catch (error) {
        response.status(500).json({error: error.message});
    }
});

router.get('/:id', async (request, response) => {
    const id = request.params.id;

    try {
        const person = await Person.findById(new MongooseTypes.ObjectId(id));

        if (!person) {
            response.status(422).json({message: 'A pessoa não foi encontrada.'});

            return;
        }

        response.status(200).json(person);
    } catch (error) {
        response.status(500).json({error: error.message});
    }
});

router.patch('/:id', async (request, response) => {
    const id = request.params.id;
    const {name, salary, approved} = request.body;

    const person = {name, salary, approved};

    try {
        await Person.findByIdAndUpdate(new MongooseTypes.ObjectId(id), person);

        response.status(200).json(person);
    } catch (error) {
        response.status(500).json({error: error.message});
    }
});

router.delete('/:id', async (request, response) => {
    const id = request.params.id;

    const person = await Person.findById(new MongooseTypes.ObjectId(id));

    if (!person) {
        response.status(422).json({message: 'A pessoa não foi encontrada.'});

        return;
    }

    try {
        await Person.findByIdAndDelete(new MongooseTypes.ObjectId(id));

        response.status(200).json({message: 'A pessoa foi deletada com SUCESSO.'});
    } catch (error) {
        response.status(500).json({error: error.message});
    }
});

module.exports = router;