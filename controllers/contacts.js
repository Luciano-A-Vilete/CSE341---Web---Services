const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        //#swagger-tags=['contacts']
        const result = await mongodb.getDatabase().db('cse341-week01').collection('contacts').find();
        const contacts = await result.toArray();
        res.status(200).json(contacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

const getSingle = async (req, res) => {
    try {
        //#swagger-tags=['contacts']
        const contactsId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db('cse341-week01').collection('contacts').findOne({ _id: contactsId });

        if (!result) {
            return res.status(404).json({ error: "Contact not found" });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching contact:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

const createContacts = async (req, res) => {
    try {
        //#swagger-tags=['contacts']
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const contact = { firstName, lastName, email, favoriteColor, birthday };
        const result = await mongodb.getDatabase().db('cse341-week01').collection('contacts').insertOne(contact);

        if (!result.acknowledged) {
            throw new Error("Contact creation failed");
        }

        res.status(201).json({ message: "Contact created successfully", id: result.insertedId });
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

const updateContacts = async (req, res) => {
    try {
        //#swagger-tags=['contacts']
        const contactsId = new ObjectId(req.params.id);
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!firstName && !lastName && !email && !favoriteColor && !birthday) {
            return res.status(400).json({ error: "At least one field is required for update" });
        }

        const updateFields = {};
        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;
        if (email) updateFields.email = email;
        if (favoriteColor) updateFields.favoriteColor = favoriteColor;
        if (birthday) updateFields.birthday = birthday;

        const result = await mongodb.getDatabase().db('cse341-week01').collection('contacts')
            .updateOne({ _id: contactsId }, { $set: updateFields });

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "No contact found to update" });
        }

        res.status(200).json({ message: "Contact updated successfully" });
    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

const deleteContacts = async (req, res) => {
    try {
        //#swagger-tags=['contacts']
        const contactsId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db('cse341-week01').collection('contacts')
            .deleteOne({ _id: contactsId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "No contact found to delete" });
        }

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
