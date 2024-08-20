import api from './api';

export const getAllGroups = async () => {
    try {
        const response = await api.get('/group/');
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }

}

export const createGroup = async (data) => {
    try {
        const response = await api.post('/group/', data);
        return response.data;
    } catch (error) {
        throw new Error("Error creating group",error.message);
    }

}

export const joinGroup = async (data) => {
    const response = await api.post('/group/join', data);
    return response.data;
}


export const getGroup = async (id) => {
    const response = await api.get(`/group/${id}`);
    return response.data;
}

export const updateGroup = async (id, data) => {
    const response = await api.patch(`/group/${id}`, data);
    return response.data;
}
export const deleteGroup = async (id) => {
    const response = await api.delete(`/group/${id}`);
    return response.data;
}

export const getMembers = async (groupId) => {
    const response = await api.get(`group/${groupId}/members`);
    return response.data;
}

export const isMember = async (groupId) => {
    const response = await api.get(`group/${groupId}/member`);
    return response.data;
}

export const leaveGroup = async (groupId) => {
    const response = await api.delete(`group/${groupId}/leaveGroup`);
    return response.data;
}


export const removeMember = async (groupId, memberId) => {
    const response  = await api.delete(`group/${groupId}/members/${memberId}`);
    return response.data;
}

