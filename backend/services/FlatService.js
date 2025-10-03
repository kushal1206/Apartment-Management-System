import Flat from "../models/Flat.js";

export class FlatService {
  async list() {
    return Flat.find({}).lean();
  }
  async create(payload) {
    if (!payload?.number?.trim())
      throw Object.assign(new Error("number is required"), { status: 400 });
    const doc = await Flat.create({
      number: payload.number.trim(),
      size: payload.size ?? "",
      floor: payload.floor ?? 0,
      occupied: !!payload.occupied,
    });
    return doc.toObject();
  }
  async update(id, patch) {
    const updated = await Flat.findByIdAndUpdate(
      id,
      { ...patch, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean();
    if (!updated) throw Object.assign(new Error("Not found"), { status: 404 });
    return updated;
  }
  async remove(id) {
    const out = await Flat.findByIdAndDelete(id).lean();
    if (!out) throw Object.assign(new Error("Not found"), { status: 404 });
    return { message: "Flat deleted" };
  }
}
