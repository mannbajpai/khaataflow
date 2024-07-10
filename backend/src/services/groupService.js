import { Expense, ExpenseSplit, Group, GroupMember, User } from "../models/index.js"

const generateUniqueCode = async () => {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (await Group.findOne({where: {code}})){
        generateUniqueCode();
    } else {
        return code;
    }
}

const createGroup = async (groupData, userId) => {
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

const getGroupById = async (id) => {
    return await Group.findByPk(id, {
        include: [
            { model: User, as: 'members' },
            { model: Expense, include: [{ model: ExpenseSplit, include: [{ model: User }] }] }
        ],
    });
};

const getAllGroupsForUser = async (userId) => {
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

const joinGroupByCode = async (code, userId) => {
    const group = await Group.findOne({ where: { code } });
    if (!group) throw new Error('Group Not Find');

    const isMember = await GroupMember.findOne({ where: { groupId: group.id, userId } });
    if (isMember) throw new Error('User Already a member of the group');

    await GroupMember.create({ groupId: group.id, userId });
    return group;
}

const updateGroup = async (id, data) => {
    const group = await Group.findByPk(id);
    if (!group) throw new Error('Group Not Found');
    Object.assign(group, data);
    await group.save();
    return group;
}

const deleteGroup = async (id, userId) => {
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
}

export default groupService;