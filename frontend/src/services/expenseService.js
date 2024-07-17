import api from "./api";

const createExpense = async (data) => {
    const response = await api.post('/expense', data);
    return response.data;
}

const getAllExpenses = async (data) => {
    const response = await api.get('/expense', data);
    return response.data;
}

const getExpense = async (id) => {
    const response = await api.get(`/expense/${id}`);
    return response.data;
}

const updateExpense = async (id,data) => {
    const response = await api.patch(`/expense/${id}`,data);
    return response.data;
}

const deleteExpense = async (id) => {
    const response = await api.delete(`/expense/${id}`);
    return response.data;
}

export default {
    createExpense,
    getAllExpenses,
    getExpense,
    updateExpense,
    deleteExpense
}
