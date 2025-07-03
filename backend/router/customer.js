const express = require('express');
const app = express();
const customerRouter = express.Router();
const mongoose = require('mongoose');
const Customer = require('../models/Customer');
//Get:list
customerRouter.get('/', async (req, res) => {
    try {
        const customer =await Customer.find();
        res.status(200).json(customer);
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error });

    }

});
//Get:list by id
customerRouter.get('/:id', async (req, res) => {
    const {id} = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid customer ID format' });
    }

    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

//POST:list
customerRouter.post('/', async (req, res) => {
    try {
        const customer = new Customer(req.body);
        const savedCustomer = await customer.save();
        res.status(200).json(savedCustomer);
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error });

    }

});

//PUT:update
customerRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const customer = req.body;
        console.log('customer',customer);
        
        const updatedCustomer =await Customer.findOneAndUpdate({
            _id: id
        }, {
            $set: customer
        }, {
            new: true
        });

        res.status(200).json(updatedCustomer);
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error });

    }

});

//Delete:list by id
customerRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let deletedCustomer = await Customer.deleteOne({ _id: id });
        res.status(200).json(deletedCustomer);
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error });

    }

});

//Delete all records
customerRouter.delete('/', async (req, res) => {
    try {
        const id = req.params.id;
        let deletedCustomer = await Customer.deleteMany({});
        res.status(200).json(deletedCustomer);
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error });

    }

});
module.exports = customerRouter;
