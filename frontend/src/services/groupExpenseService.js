import api from "./api";

const createGroupExpense = async (groupId,data) => {
    const response = await api.post(`/group/expense/${groupId}`,data);
    return response.data;
}

const getGroupExpenses = async (groupId,data) => {
    const response = await api.get(`/group/expense/${groupId}`,data);
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

const deleteGroupExpense = async (groupId,id) => {
    const response = await api.delete(`/group/expense/${groupId}/${id}`);
    return response.data;
}

const settleExpense = async (id) => {
    const response = await api.patch(`/settle/${id}`);
    return response.data;
}

export default {
    createGroupExpense,
    getGroupExpense,
    getGroupExpenses,
    updateGroupExpense,
    deleteGroupExpense,
    settleExpense
}


