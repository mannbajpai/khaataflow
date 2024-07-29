import api from "./api";

export const updateUser = async (data) => {
    const response = await api.patch('/user/me', data);
    return response.data;
}

export const deleteUser = async () => {
    try {
        const response = await api.delete('/user/me');
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }

}

