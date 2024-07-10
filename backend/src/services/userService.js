import { User } from "../models/index.js"

const getAllUsers = async () => {
    return await User.findAll();
}

const getUserById = async (id) => {
    return await User.findByPk(id);
}

const updateUser = async (id, data) => {
    const user = getUserById(id);
    if (!user) throw new Error();
    Object.assign(user, data);
    await user.save();
    return user;
}

const deleteUser = async (id) => {
    const user = getUserById(id);
    if (!user) throw new Error();
    await user.destroy({
        truncate: true,
      });
    return user;
}

const userService = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};

export default userService;