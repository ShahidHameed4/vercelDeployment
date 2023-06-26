import mongoose from 'mongoose';

const { Schema } = mongoose;

const TransactionSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  ngoId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  teamleadId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
