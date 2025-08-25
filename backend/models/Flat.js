import mongoose from 'mongoose';

const flatSchema = new mongoose.Schema({
  number: { type: String, required: true },
  size: String,
  floor: Number,
  occupied: { type: Boolean, default: false }
});

const Flat = mongoose.models.Flat || mongoose.model("Flat", flatSchema);
export default mongoose.model('Flat', flatSchema);
