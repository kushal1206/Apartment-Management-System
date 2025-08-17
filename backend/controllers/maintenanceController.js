import Maintenance from '../models/Maintenance.js';

export const getRequests = async (req, res) => {
  try {
    const requests = await Maintenance.find();
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createRequest = async (req, res) => {
  try {
    const request = new Maintenance(req.body);
    const saved = await request.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const updated = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    await Maintenance.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
