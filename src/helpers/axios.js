import axios from "axios";

const token = window.localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: "https://limitless-island-44318.herokuapp.com/api",
    headers: {
        'authorization' : token ? `Bearer ${token}` : ''
    }
});

export default axiosInstance;