import { User, Group, Expense, ExpenseSplit } from "../models/index.js"
import { getAllGroupsForUser, getMembers, removeMember, getCreator } from "./groupService.js"

export const getAllUsers = async () => {
    return await User.findAll();
}

export const getUserById = async (id) => {
    return await User.findByPk(id);
}

export const updateUser = async (id, data) => {
    const user = await getUserById(id);
    if (!user) throw new Error();
    Object.assign(user, data);
    await user.save();
    return user;
}

export const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error();
    }
    else {
        // Delete associated expenses
        await Expense.destroy({
            where: {
                userId: id,
            },
        });

        //Remove User from Groups
        const groups = await getAllGroupsForUser(id);

        await Promise.all(
            groups.map(async (group) => {
                const creator = await getCreator(group.id);
                if (creator === id) {
                    const members = await getMembers(group.id);
                    if (members.length === 1) {
                        await group.destroy();
                    } else {
                        const newOwnerId = (members.find((member) => member.id !== id)).id;
                        await group.update({ createdBy: newOwnerId });
                    }
                }
                await removeMember(group.id, id);

                // Check if the group has no more members and delete it if needed
                const members = await getMembers(group.id);
                if (members.length === 0) {
                    await group.destroy();
                }
            })
        )

        // Delete associated expense splits
        await ExpenseSplit.destroy({
            where: {
                userId: id,
            },
        });

        await User.destroy({
            where: {
                id: user.id,
            }
        });
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