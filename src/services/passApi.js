import axios from 'axios';

const passApi = axios.create({
  baseURL: 'http://api.open-notify.org/',
  timeout: 10000,
  timeoutErrorMessage: 3000,
  proxy: '201.83.68.162'
});

export default passApi;