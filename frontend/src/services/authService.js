import api from "./api";

const signup = async (credentials) => {
    const response = await api.post('/auth/signup', credentials);
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

export default {
    login,
    logout,
    signup,
    isAuthenticated,
}