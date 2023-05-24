import axios from "axios";

const BASE_URL = 'http://localhost:4444/api';

const loginConfig = {
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
}

export const LoginAPIInstance = axios.create(loginConfig);

const defaultConfig = {
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'authorization': ''
    }
}

const uploadConfig = {
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
        'authorization': ''
    }
}

const token = localStorage.getItem('token');
if (token) {
    defaultConfig.headers['authorization'] = `Bearer ${token}`;
    uploadConfig.headers['authorization'] = `Bearer ${token}`;
};

export const DefaultAPIInstance = axios.create(defaultConfig);
export const UploadAPIInstance = axios.create(uploadConfig);