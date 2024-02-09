import axios from 'axios';
import Cookies from 'js-cookie';

const axiosConfig = {
  baseURL: import.meta.env.MODE === 'production' ? `${import.meta.env.VITE_API_DOMAIN}${import.meta.env.VITE_API}` : import.meta.env.VITE_API,
};

if (import.meta.env.VITE_API_TIMEOUT && parseInt(import.meta.env.VITE_API_TIMEOUT, 10)) {
  axiosConfig.timeout = parseInt(import.meta.env.VITE_API_TIMEOUT, 10);
}

const apiCall = axios.create(axiosConfig);
const token = Cookies.get('token') || undefined;
apiCall.defaults.headers.common.Authorization = token ? `Bearer ${token}` : '';

apiCall.defaults.headers.post['Content-Type'] = 'application/json';

apiCall.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove('token');
      if (window.location.pathname !== '/login') {
        window.location = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default apiCall;
