import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' }
}, { timestamps: true });

const Maintenance = mongoose.models.Maintenance || mongoose.model("Maintenance", maintenanceSchema);
export default mongoose.model('Maintenance', maintenanceSchema);
