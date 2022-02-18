import axios from 'axios';

export const axiosInstance = axios.create({
  baseUrl: 'https://kaa-crypto.herokuapp.com/api',
});
