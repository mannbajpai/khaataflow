import api from "./api";

const getUser = async () => {
    const response = await api.get('/user/me');
    return response.data;
}

const updateUser = async (data) => {
    const response = await api.patch('/user/me', data);
    return response.data;
}

const deleteUser = async ()=> {
    const response = await api.delete('/user/me');
    return response.data;
}

export default {
    getUser,
    updateUser,
    deleteUser,
}