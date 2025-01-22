import axios from 'axios';

const axiosClient = axios.create({ baseURL: 'http://ergast.com/api/f1' });

// axiosClient.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//   config.headers.userId = JSON.parse(localStorage.getItem('user'))?.id;
//   config.headers.lang = JSON.parse(localStorage.getItem('user'))?.lang;
//   config.headers.countryId = JSON.parse(localStorage.getItem('user'))?.country_id;
//   return config;
// });

// axiosClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.setItem('token', '');
//       localStorage.setItem('user', '');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosClient;
