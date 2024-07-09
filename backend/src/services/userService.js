import { User } from "../models"

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

export {
    getUserById,
    updateUser,
    deleteUser
};