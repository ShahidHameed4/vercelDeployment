import mongoose from 'mongoose';
const { Schema } = mongoose;

const operationsSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  ngoId: { type: String, required: true },
  purpose: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  balance: { type: Number, required: true },
  teamleadId: { type: String, required: true },
  status: { type: String, required: true }
});

export default mongoose.model('Operations', operationsSchema);
