const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db('cse341-week01').collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    const contactsId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('cse341-week01').collection('contacts').find({_id: contactsId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

const createContacts = async (req, res) => {
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const result = await mongodb.getDatabase().db('cse341-week01').collection('contacts').insertOne(contact);

        if (!result.acknowledged) {
            throw new Error("Contact creation failed");
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ message: "Contact created successfully", id: result.insertedId });
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

const updateContacts = async (req, res) => {
    try {
        const contactsId = new ObjectId(req.params.id);
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const result = await mongodb.getDatabase().db('cse341-week01').collection('contacts')
            .updateOne({ _id: contactsId }, { $set: contact });

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "No contact found to update" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: "Contact updated successfully" });
    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

const deleteContacts = async (req, res) => {
    try {
        const contactsId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db('cse341-week01').collection('contacts')
            .deleteOne({ _id: contactsId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "No contact found to delete" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContacts,
    updateContacts,
    deleteContacts
};