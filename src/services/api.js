import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.wheretheiss.at/v1/',
  timeout: 3000,
  timeoutErrorMessage: 3000,
});

export default api;