import { Expense, ExpenseSplit, Group, GroupMember, User } from "../models/index.js"

const generateUniqueCode = async () => {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (await Group.findOne({ where: { code } })) {
        generateUniqueCode();
    } else {
        return code;
    }
}

export const createGroup = async (groupData, userId) => {
    const { name, description, members } = groupData;
    const code = await generateUniqueCode();
    console.log(groupData, userId)
    const group = await Group.create({
        name,
        description,
        createdBy: userId,
        code
    });

    for (const memberId of members) {
        await GroupMember.create({
            groupId: group.id,
            userId: memberId,
        });
    }

    await GroupMember.create({
        groupId: group.id,
        userId
    });

    return group;
}

export const getGroupById = async (id) => {
    return await Group.findByPk(id, {
        include: [
            { model: User, as: 'members' },
            { model: Expense, include: [{ model: ExpenseSplit, include: [{ model: User }] }] }
        ],
    });
};

export const getAllGroupsForUser = async (userId) => {
    return await Group.findAll({
        include: [
            {
                model: User,
                as: 'members',
                where: { id: userId }
            },
            { model: Expense, include: [{ model: ExpenseSplit, include: [{ model: User }] }] }
        ],
    });
}

export const getMembers = async (groupId) => {
    try {
        const group = await Group.findByPk(groupId, {
            include: [
                {
                    model: User,
                    as: 'members',
                    attributes: ['id', 'username', 'email'],
                },
            ],
        });

        if (!group) {
            throw new Error('Group not found');
        }
        return group.members;
    } catch (error) {
        console.error('Error fetching group members:', error);
        throw new Error('Failed to fetch group members');
    }
}

export const removeMember = async (groupId, userId) => {
    try {
        const group = await getGroupById(groupId);

        const member = await User.findByPk(userId);

        if (!member) {
            throw new Error('User not found');
        }

        await GroupMember.destroy({
            where: {
                groupId: group.id,
                userId: member.id,
            },
        });

        console.log(`Member with ID ${userId} removed from group ${groupId}`);
        return { message: 'Member removed successfully' };
    } catch (error) {
        console.error('Error removing member:', error);
        throw new Error('Failed to remove member');
    }
}

export const joinGroupByCode = async (code, userId) => {
    const group = await Group.findOne({ where: { code } });
    if (!group) throw new Error('Group Not Find');

    const isMember = await GroupMember.findOne({ where: { groupId: group.id, userId } });
    if (isMember) throw new Error('User Already a member of the group');

    await GroupMember.create({ groupId: group.id, userId });
    return group;
}

export const updateGroup = async (id, data) => {
    const group = await Group.findByPk(id);
    if (!group) throw new Error('Group Not Found');
    Object.assign(group, data);
    await group.save();
    return group;
}

export const deleteGroup = async (id, userId) => {
    const group = Group.findByPk(id);
    if (!group) throw new Error('Group Not Found');
    if (group.createdBy !== userId) throw new Error('Only the creator can delete the group');
    await group.destroy();
    return group;
}

const groupService = {
    createGroup,
    getGroupById,
    getAllGroupsForUser,
    joinGroupByCode,
    updateGroup,
    deleteGroup,
    getMembers,
    removeMember
}

export default groupService;