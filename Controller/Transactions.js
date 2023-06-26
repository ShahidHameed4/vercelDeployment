import Transaction from '../Model/Transactions.js';
import expressAsyncHandler from 'express-async-handler';

// Add a new transaction
const addTransaction = async (transactionData) => {
  try {
    const newTransaction = new Transaction(transactionData);
    const savedTransaction = await newTransaction.save();
    return savedTransaction;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating transaction');
  }
};

const getAllTransactions = expressAsyncHandler(async (req, res) => {
    try {
      const transactions = await Transaction.find({ngoId:req.ngo.id});
      
      res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving transactions' });
    }
  });
  


export {
    addTransaction,
    getAllTransactions,
}