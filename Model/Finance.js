import mongoose from 'mongoose';

const { Schema } = mongoose;

const operationSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  Cause: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  ngoId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  Amount: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
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

const Operation = mongoose.model('Finance', operationSchema);

export default Operation;
