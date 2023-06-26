import mongoose from 'mongoose';

const advocacySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  campaignType: {
    type: String,
    required: true
  },
  ngoId: {
    type: String,
    required: true
  },
  audience: {
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

export default mongoose.model('Advocacy', advocacySchema);
