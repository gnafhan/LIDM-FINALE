import axios from "axios";

const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.EXPO_PUBLIC_TOKEN}`,
    },
});

export default instance;