import Flat from '../models/Flat.js';

export const getFlats = async (req, res) => {
  try {
    const flats = await Flat.find();
    res.status(200).json(flats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createFlat = async (req, res) => {
  try {
    const flat = new Flat(req.body);
    const saved = await flat.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateFlat = async (req, res) => {
  try {
    const updated = await Flat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteFlat = async (req, res) => {
  try {
    await Flat.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Flat deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
