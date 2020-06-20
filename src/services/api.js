import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.wheretheiss.at/v1/',
});

export default api;