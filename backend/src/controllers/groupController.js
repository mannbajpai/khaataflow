import * as groupService from "../services/groupService.js";

export const createGroup = async (req, res) => {
    try {
        const group = await groupService.createGroup(req.body, req.user.dataValues.id);
        res.status(201).json({ status: 'success', data: { group } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const getGroup = async (req, res) => {
    try {
        const group = await groupService.getGroupById(req.params.id);
        if (!group) {
            return res.status(404).json({ status: 'fail', message: 'Group not found' });
        }
        res.status(200).json({ status: 'success', data: { group } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getAllGroups = async (req, res) => {
    try {
        const groups = await groupService.getAllGroupsForUser(req.user.dataValues.id);
        res.status(200).json({ status: 'success',  data:groups });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const joinGroup = async (req, res) => {
    try {
        const group = await groupService.joinGroupByCode(req.body.code, req.user.dataValues.id);
        res.status(200).json({ status: 'success', data: { group } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const getMembers = async (req, res) => {
    try {
        const members = await groupService.getMembers(req.params.groupId);
        res.status(200).json({ status: 'success', data:{members}})
    } catch (error) {
        res.status(400).json({status:'fail', message:error.message});
    }
}

export const isGroupMember = async (req, res) => {
    try {
        const member = await groupService.checkMembership(req.params.groupId, req.user.dataValues.id);
        res.status(200).json({status:'success', data:member})
    } catch (error) {
        res.status(500).json({status:'fail', message:error.message});
    }
}

export const removeMember = async (req,res)=>{
    try {
        const result = await groupService.removeMember(req.params.groupId, req.params.memberId, req.user.dataValues.id);
        res.status(200).json({status:'success', result:{result}})
    } catch (error) {
        res.status(400).json({status:'fail', message:error.message});
    }
}

export const leaveGroup = async (req,res)=>{
    try {
        const result = await groupService.leaveGroup(req.params.groupId, req.user.dataValues.id);
        res.status(200).json({status:'success', result:{result}})
    } catch (error) {
        res.status(400).json({status:'fail', message:error.message});
    }
}

export const updateGroup = async (req, res) => {
    try {
        const group = await groupService.updateGroup(req.params.id, req.body);
        res.status(200).json({ status: 'success', data: { group } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const deleteGroup = async (req, res) => {
    try {
        const result = await groupService.deleteGroup(req.params.id, req.user.dataValues.id);
        res.status(204).json({ status: 'success', result: result });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
