import axios from 'axios';

// Базовый URL
const BASE_URL = 'http://127.0.0.1:8000';

// Получаем токен из localStorage
const getToken = () => localStorage.getItem('access_token');

// Создаем инстанс axios
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик для авторизации
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const getProducts = async (params = {}) => {
  try {
    const response = await apiClient.get(`/catalog/products/`, { params });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении продуктов:', error);
    throw error;
  }
};

// --- Marketplaces API ---
export const getMarketplaces = async () => {
  const response = await apiClient.get('/catalog/marketplaces/');
  return response.data;
};

export const getProductById = async (id) => {
  const res = await fetch(`http://127.0.0.1:8000/catalog/products/${id}/`);
  return res.json();
};


// --- Favorites API ---
export const getFavorites = async () => {
  const response = await apiClient.get('/catalog/favorites/');
  return response.data;
};

// --- Reviews API ---
export const getReviews = async () => {
  const response = await apiClient.get('/catalog/reviews/');
  return response.data;
};

// --- Auth API (Login, Register, Refresh) ---

// Логин
export const login = async (credentials) => {
  const response = await apiClient.post('/auth/jwt/create/', credentials);
  if (response.data.access) {
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
  }
  return response.data;
};

// Получить текущего пользователя
export const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/users/me/');
  return response.data;
};

// Обновление access токена
export const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh_token');
  if (!refresh) throw new Error('No refresh token found');

  const response = await apiClient.post('/auth/jwt/refresh/', { refresh });
  localStorage.setItem('access_token', response.data.access);
  return response.data;
};
