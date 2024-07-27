import api from './api';

const getAllGroups = async () => {
    try {
        const response = await api.get('/group/');
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }

}

const createGroup = async (data) => {
    try {
        const response = await api.post('/group/', data);
        return response.data;
    } catch (error) {
        throw new Error("Error creating group",error.message);
    }

}

const joinGroup = async (data) => {
    const response = await api.post('/group/join', data);
    return response.data;
}


const getGroup = async (id) => {
    const response = await api.get(`/group/${id}`);
    return response.data;
}

const updateGroup = async (id, data) => {
    const response = await api.patch(`/group/${id}`, data);
    return response.data;
}
const deleteGroup = async (id) => {
    const response = await api.delete(`/group/${id}`);
    return response.data;
}

export {
    createGroup,
    getAllGroups,
    joinGroup,
    getGroup,
    updateGroup,
    deleteGroup,
}
