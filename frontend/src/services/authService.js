import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

const signup = async (credentials) => {
    const response = await api.post('/auth/signup', {data: JSON.stringify(credentials) });
    return response.data;
}

const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    const {token} = response.data;
    localStorage.setItem('token', token);
    return response.data;
}

const logout = () => {
    localStorage.removeItem('token');
    return api.post('/auth/logout');
};

const isAuthenticated = () => !!localStorage.getItem('token');

export {
    login,
    logout,
    signup,
    isAuthenticated,
}