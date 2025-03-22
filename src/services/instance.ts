import axios from 'axios';
import { getSession } from 'next-auth/react';

// Создаем экземпляр Axios
export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Перехватчик запросов для добавления Bearer token
axiosInstance.interceptors.request.use(
    async (config) => {
        // Проверяем, находимся ли мы на клиенте или сервере
        let token;

        if (typeof window !== 'undefined') {
            // Клиентская сторона: используем getSession
            const session = await getSession();
            token = session?.user?.token;
        }

        // Если токен есть, добавляем его в заголовки
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);