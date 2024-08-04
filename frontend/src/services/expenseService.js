import api from './api'
// Function to get all expenses
export const getAllExpenses = async () => {
    try {
        const response = await api.get(`/expense/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error;
    }
};

// Function to get a single expense by ID
export const getExpenseById = async (expenseId) => {
    try {
        const response = await api.get(`/expense/${expenseId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching expense:', error);
        throw error;
    }
};

// Function to create a new expense
export const createExpense = async (expenseData) => {
    try {
        const response = await api.post("/expense/", expenseData);
        return response.data;
    } catch (error) {
        console.error('Error creating expense:', error);
        throw error;
    }
};

// Function to update an expense
export const updateExpense = async (expenseId, expenseData) => {
    try {
        console.log(expenseData);
        const response = await api.patch(`/expense/${expenseId}`, expenseData);
        return response.data;
    } catch (error) {
        console.error('Error updating expense:', error);
        throw error;
    }
};

// Function to delete an expense
export const deleteExpense = async (expenseId) => {
    try {
        const response = await api.delete(`/expense/${expenseId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting expense:', error);
        throw error;
    }
};