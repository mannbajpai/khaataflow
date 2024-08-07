import api from "./api";

export const createGroupExpense = async (groupId,data) => {
    const response = await api.post(`/group/expense/${groupId}`,data);
    return response.data;
}

export const getGroupExpenses = async (groupId) => {
    const response = await api.get(`/group/expense/${groupId}`);
    return response.data;
}

const getGroupExpense = async (groupId,id) => {
    const response = await api.get(`/group/expense/${groupId}/${id}`);
    return response.data;
}

const updateGroupExpense = async (groupId,id,data) => {
    const response = await api.patch(`/group/expense/${groupId}/${id}`,data);
    return response.data;
}

export const deleteGroupExpense = async (groupId,id) => {
    const response = await api.delete(`/group/expense/${groupId}/${id}`);
    return response.data;
}

export const getMySplits = async (groupId,userId) => {
    const response = await api.get(`/group/expense/${groupId}/${userId}/splits`);
    return response.data;
}

export const settleExpense = async (splitId) => {
    const response = await api.patch(`group/expense/splits/${splitId}/settle`);
    return response.data;
}

export const deleteExpense = async (splitId) => {
    const response = await api.delete(`group/expense/splits/${splitId}/settle`);
    return response.data;
}

export default {
    createGroupExpense,
    getGroupExpense,
    getGroupExpenses,
    updateGroupExpense,
    deleteGroupExpense,
    settleExpense,
    deleteExpense,
}


