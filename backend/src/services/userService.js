import { User } from "../models/index.js"

const getAllUsers = async () => {
    return await User.findAll();
}

const getUserById = async (id) => {
    return await User.findByPk(id);
}

const updateUser = async (id, data) => {
    const user = await getUserById(id);
    if (!user) throw new Error();
    Object.assign(user, data);
    await user.save();
    return user;
}

const deleteUser = async (id) => {
    console.log(id);
    const user = await getUserById(id);
    if (!user) {
        throw new Error();
    }
    else {
        await User.destroy({where: {
            id: user.id,
        }});
    }
    return user;
}

const userService = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};

export default userService;