import axios from 'axios';
import Cookies from 'js-cookie';

const axiosConfig = {
  baseURL: import.meta.env.VITE_API,
};

if (import.meta.env.VITE_API_TIMEOUT && parseInt(import.meta.env.VITE_API_TIMEOUT, 10)) {
  axiosConfig.timeout = parseInt(import.meta.env.VITE_API_TIMEOUT, 10);
}

const apiCall = axios.create(axiosConfig);
const token = Cookies.get('token') || undefined;
console.log('token', Cookies.get('token'));
apiCall.defaults.headers.common.Authorization = token ? `Bearer ${token}` : '';

apiCall.defaults.headers.post['Content-Type'] = 'application/json';

export default apiCall;
