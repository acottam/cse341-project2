const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // swagger.tags = ['Parks']
    const result = await mongodb.getDatabase().collection('parks').find();
    result.toArray().then((parks) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(parks);
    });
};

const getSingle = async (req, res) => {
    // swagger.tags = ['Parks']
    const parkId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('parks').find({ _id: parkId });
    result.toArray().then((parks) => {
        if (!parks[0]) return res.status(404).json('Park not found.');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(parks[0]);
    });
};

const createPark = async (req, res) => {
    // swagger.tags = ['Parks']
    const park = {
        description: req.body.description,
        fullName: req.body.fullName,
        latLong: req.body.latLong,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        parkCode: req.body.parkCode,
        url: req.body.url
    };

    const response = await mongodb.getDatabase().collection('parks').insertOne(park);
    if (response.acknowledged) {
        res.status(201).json({ id: response.insertedId });
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the park.');
    }
};

const updatePark = async (req, res) => {
    // swagger.tags = ['Parks']
    const parkId = new ObjectId(req.params.id);
    const park = {
        description: req.body.description,
        fullName: req.body.fullName,
        latLong: req.body.latLong,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        parkCode: req.body.parkCode,
        url: req.body.url
    };

    const response = await mongodb.getDatabase().collection('parks').replaceOne({ _id: parkId }, park);
    if (response.modifiedCount > 0) {
        res.status(200).json({ id: parkId });
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the park.');
    }
};

const deletePark = async (req, res) => {
    // swagger.tags = ['Parks']
    const parkId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection('parks').deleteOne({ _id: parkId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the park.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createPark,
    updatePark,
    deletePark
};
