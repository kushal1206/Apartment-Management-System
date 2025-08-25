import axios from '../axiosConfig.jsx';
export const getFlats = async () => (await axios.get('/flats')).data;
export const getFlatById = async (id) => (await axios.get(`/flats/${id}`)).data;
export const createFlat = async (payload) => (await axios.post('/flats', payload)).data;
export const updateFlat = async (id, payload) => (await axios.put(`/flats/${id}`, payload)).data;
export const deleteFlat = async (id) => (await axios.delete(`/flats/${id}`)).data;
