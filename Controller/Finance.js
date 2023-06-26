import mongoose from 'mongoose';
import Operation from '../Model/Finance.js';
import Transaction from '../Model/Transactions.js';
import NGO from '../Model/NGO.js';


// Create a new finance operation
const createOperation = async (operationData) => {
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
     const existingNGO = await NGO.findOne({ _id:operationData.ngoId });
     var balance=0;
     if (!existingNGO) {
         return null;
     }
     if(operationData.type!='spending'){
        balance = parseInt(existingNGO.capital) + parseInt(operationData.Amount);
     }
     else{
        balance = parseInt(existingNGO.capital) - parseInt(operationData.Amount);
     }

    
     if (balance < 0) {

       console.log("Not enough balance" + existingNGO.capital + " " + operationData.Amount);
       return null;
     }
     existingNGO.capital = balance;
     const savedNGO = await existingNGO.save();
     let date2 = new Date();
     date2 = date2.getDate() + "/" + date2.getMonth() + "/" + date2.getFullYear()+"  "+date2.getHours() +":"+date2.getMinutes()+":"+date2.getSeconds();
 
     // Create a new transaction with the generated ID and the passed data
     const transaction = new Transaction({
       id: id,
       department: "Finance",
       type: operationData.type,
       amount: operationData.Amount,
       date: date2,
       teamleadId: operationData.teamleadId,
       status: operationData.status,
       ngoId: operationData.ngoId,
     });
     const savedTransaction = await transaction.save();

     operationData.id = id;
    operationData.balance = balance;
    operationData.date = date2;




    const newOperation = new Operation(operationData);
    const savedOperation = await newOperation.save();
    return savedOperation;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating finance operation');
  }
};

// Retrieve all finance operations
const getAllOperations = async (id) => {
  try {
    const operations = await Operation.find({ngoId:id});
    return operations;
  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving finance operations');
  }
};

// Retrieve a finance operation by ID
const getOperationById = async (id) => {
  try {
    const operation = await Operation.findById(id);
    return operation;
  } catch (error) {
    console.error(error);
    throw new Error(`Error retrieving finance operation with ID: ${id}`);
  }
};

// Update a finance operation by ID
const updateOperationById = async (id, operationData) => {
  try {
    const operation = await Operation.findByIdAndUpdate(id, operationData, {
      new: true,
    });
    return operation;
  } catch (error) {
    console.error(error);
    throw new Error(`Error updating finance operation with ID: ${id}`);
  }
};

// Delete a finance operation by ID
const deleteOperationById = async (id) => {
  try {
    const operation = await Operation.findByIdAndDelete(id);
    return operation;
  } catch (error) {
    console.error(error);
    throw new Error(`Error deleting finance operation with ID: ${id}`);
  }
};

export {
    createOperation,
    getAllOperations,
    getOperationById,
    updateOperationById,
    deleteOperationById,
};
