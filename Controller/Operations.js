


import express from 'express';
import Operations from '../Model/Operations.js';
import asyncHandler from 'express-async-handler';
import Transaction from '../Model/Transactions.js';
import NGO from '../Model/NGO.js'

// Create a new operation
const create = asyncHandler(async (req, res) => {
  try {
    // Generate a random 6-digit number for the ID field
    let id = Math.floor(100000 + Math.random() * 900000);

    // Check if the generated ID already exists in the database
    let result = await Transaction.findOne({ id: id });
    while (result) {
      id = Math.floor(100000 + Math.random() * 900000);
      result = await Transaction.findOne({ id: id });
    }

    // Get the current balance of the NGO
    const existingNGO = await NGO.findOne({ _id:req.ngo.id });
    if (!existingNGO) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const balance = parseInt(existingNGO.capital) - parseInt(req.body.amount);
    if (balance < 0) {
      res.status(501).json({ error: "Not enough balance" });
      return;
    }

    existingNGO.capital = balance;
    const savedNGO = await existingNGO.save();
    let date2 = new Date();
    date2 = date2.getDate() + "/" + date2.getMonth() + "/" + date2.getFullYear()+"  "+date2.getHours() +":"+date2.getMinutes()+":"+date2.getSeconds();

    // Create a new transaction with the generated ID and the passed data
    const transaction = new Transaction({
      id: id,
      department: "Operations",
      type: "spending",
      amount: req.body.amount,
      date: date2,
      teamleadId: req.body.teamleadId,
      status: req.body.status,
      ngoId: req.ngo.id,
    });
    const savedTransaction = await transaction.save();

    // Create a new operation with the generated ID and the passed data
    const operation = new Operations({
      id: id,
      name: req.body.name,
      type: req.body.type,
      ngoId: req.ngo.id,
      purpose: req.body.purpose,
      amount: req.body.amount,
      date: date2,
      balance: balance,
      teamleadId: req.body.teamleadId,
      status: req.body.status,
    });
    const savedOperation = await operation.save();

    console.log("New transaction created:", savedTransaction);
    console.log("New operation created:", savedOperation);

    res.status(201).json({
      transaction: savedTransaction,
      operation: savedOperation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});



// Get all operations
const getAll = asyncHandler(async (req, res) => {
    try{
        const operations = await Operations.find({ngoId: req.ngo.id});
        res.status(200).json(operations);

    }
    catch(error){
        res.status(404).json({message: error.message});
    }

});

// Get a specific operation by ID
const getOne = asyncHandler(async (req, res) => {
  Operations.findOne({ id: req.params.id })
    .then(result => {
      if (!result) {
        res.status(404).send('Operation not found');
      } else {
        console.log('Operation retrieved:', result);
        res.json(result);
      }
    })
    .catch(error => {
      console.error('Error getting operation:', error);
      res.status(500).send('Internal server error');
    });
});

// Update an operation by ID
const update = asyncHandler(async (req, res) => {
  Operations.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
    .then(result => {
      if (!result) {
        res.status(404).send('Operation not found');
      } else {
        console.log('Operation updated:', result);
        res.json(result);
      }
    })
    .catch(error => {
      console.error('Error updating operation:', error);
      res.status(500).send('Internal server error');
    });
});

// Delete an operation by ID
const remove = asyncHandler(async (req, res) => {
    Operations.findOneAndDelete({ id: req.params.id })

    .then(result => {
        if (!result) {
            res.status(404).send('Operation not found');
        } else {
            console.log('Operation deleted:', result);
            res.json(result);
        }
    })
    .catch(error => {
        console.error('Error deleting operation:', error);
        res.status(500).send('Internal server error');
    });
});


export { create, getAll, getOne, update, remove}