import axios from 'axios';
import { store } from '../app/store';
import { notify } from '../components/notification/notificationSlice';

const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' }
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    store.dispatch(
      notify({
        message: String(error.response.data),
        type: 'ERROR'
      })
    );
    return Promise.reject(error);
  }
);

export default request;
