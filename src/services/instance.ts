import axios from 'axios';

export const axiosInstance = axios.create({
    //baseURL: process.env.NEXT_PUBLIC_API_URL,
    baseURL: "https://nevil-backend.vercel.app/api/v1",
});
