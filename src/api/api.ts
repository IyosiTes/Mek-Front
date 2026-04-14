import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    
        const publicRoutes = [
      "/auth/login/",
      "/auth/register/",
      "/auth/forgot-password/",
      "/auth/reset-password/",
    ];

    const isPublic = publicRoutes.some((route) =>
      config.url?.includes(route)
    );

    if (token && config.headers && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
 export default api;   