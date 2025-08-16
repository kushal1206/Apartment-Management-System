import axios from '../axiosConfig.jsx';
export const getFlats = async () => (await axios.get('/api/flats')).data;
export const getFlatById = async (id) => (await axios.get(`/api/flats/${id}`)).data;
export const createFlat = async (payload) => (await axios.post('/api/flats', payload)).data;
export const updateFlat = async (id, payload) => (await axios.put(`/api/flats/${id}`, payload)).data;
export const deleteFlat = async (id) => (await axios.delete(`/api/flats/${id}`)).data;
