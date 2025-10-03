import { FlatAccessProxy } from "../services/FlatAccessProxy.js";
import { FlatService } from "../services/flatservice.js";
const service = new FlatService();
const secured = new FlatAccessProxy(service);

export const getFlats = async (req, res) => {
  try {
    const flats = await secured.list(req.user);
    res.status(200).json(flats);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const createFlat = async (req, res) => {
  try {
    const saved = await secured.create(req.user, req.body);
    res.status(201).json(saved);
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

export const updateFlat = async (req, res) => {
  try {
    const updated = await secured.update(req.user, req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

export const deleteFlat = async (req, res) => {
  try {
    const out = await secured.remove(req.user, req.params.id);
    res.status(200).json(out);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
