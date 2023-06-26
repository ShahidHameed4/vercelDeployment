import mongoose from 'mongoose'

const NGO = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  passcode: {
    type: String,
    required: true
  },
  members: {
    type: Number,
    required: true
  },
  capital: {
    type: Number,
    required: true
  },
  objective: {
    type: String,
    required: true
  },
  vision: {
    type: String,
    required: true
  }
});
export default mongoose.model('NGO', NGO);
