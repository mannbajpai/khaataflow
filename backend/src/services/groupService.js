import { Expense, ExpenseSplit, Group, GroupExpense, GroupMember, User } from "../models/index.js"

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
    const { name, description } = groupData;
    const code = await generateUniqueCode();
    console.log(groupData, userId)
    const group = await Group.create({
        name,
        description,
        createdBy: userId,
        code
    });

    await GroupMember.create({
        groupId: group.id,
        userId
    });

    return group;
}

export const getGroupById = async (id) => {
    return await Group.findByPk(id, {
        include: [
            {
                model: User,
                as: 'members'
            },
        ],
    });
};

export const getAllGroupsForUser = async (userId) => {
    return await User.findByPk(userId,
        {
            attributes: [],
            include: [
                {
                    model: Group,
                    as: 'groups',
                    attributes: ['code', 'description', 'name', 'id'],
                    through: { attributes: [] }
                },
            ],
        });
}

export const getCreator = async (groupId) => {
    try {
        const group = await Group.findByPk(groupId);
        if (!group) {
            throw new Error('Group not found');
        }
        return group.createdBy;
    } catch (error) {
        console.error('Error fetching group creator:', error);
        throw new Error('Failed to fetch group creator');
    }
}

export const getMembers = async (groupId) => {
    try {
        const group = await Group.findByPk(groupId, 
            {
            attributes:[],
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

export const checkMembership = async (groupId, userId) =>{
    try {
        const member = GroupMember.findOne({where: {groupId, userId}})
        if (member === null){
            throw new Error('Not a member')
        }
        return member;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const removeMember = async (groupId, userId) => {
    try {
        const group = await Group.findByPk(groupId);

        if (!group) {
            throw new Error('Group not found');
        }

        const member = await User.findByPk(userId);

        if (!member) {
            throw new Error('User not found');
        }

        // Attempt to destroy the group member relationship
        const result = await GroupMember.destroy({
            where: {
                groupId: group.id,
                userId: member.id,
            },
        });

        // Check if the record was actually deleted
        if (result === 0) {
            throw new Error('Member not part of the group');
        }

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
    removeMember,
    getCreator,
    checkMembership
}

export default groupService;