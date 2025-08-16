import Maintenance from '../models/Maintenance.js';

export const getRequests = async (req, res) => {
  try {
    const requests = await Maintenance.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createRequest = async (req, res) => {
  try {
    const request = new Maintenance(req.body);
    const saved = await request.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const updated = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    await Maintenance.findByIdAndDelete(req.params.id);
    res.json({ message: 'Maintenance request deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
