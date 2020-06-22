import axios from 'axios';

const passApi = axios.create({
  baseURL: 'http://api.open-notify.org/',
});

export default passApi;