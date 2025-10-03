import mongoose from "mongoose";
import { invalidatePrefix } from "../middleware/cache.js";
const maintenanceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
      index: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
      index: true,
    },
  },
  { timestamps: true }
);

maintenanceSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

export default mongoose.models.Maintenance ||
  mongoose.model("Maintenance", maintenanceSchema);

const bust = () => invalidatePrefix("maint:list:");
maintenanceSchema.post("save", bust);
maintenanceSchema.post("findOneAndUpdate", bust);
maintenanceSchema.post("findOneAndDelete", bust);
maintenanceSchema.post("deleteOne", bust);
