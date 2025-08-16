import axios from '../axiosConfig.jsx';
export const getRequests = async (status) => {
  const q = status ? `?status=${encodeURIComponent(status)}` : '';
  return (await axios.get(`/api/maintenance${q}`)).data;
};
export const getRequestById = async (id) => (await axios.get(`/api/maintenance/${id}`)).data;
export const createRequest = async (payload) => (await axios.post('/api/maintenance', payload)).data;
export const updateRequest = async (id, payload) => (await axios.put(`/api/maintenance/${id}`, payload)).data;
export const deleteRequest = async (id) => (await axios.delete(`/api/maintenance/${id}`)).data;
