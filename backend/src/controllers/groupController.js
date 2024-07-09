import groupService from "../services/groupService.js";

const createGroup = async (req, res) => {
    try {
        const group = await groupService.createGroup(req.body, req.user.id);
        res.status(201).json({ status: 'success', data: { group } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

const getGroup = async (req, res) => {
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

const getAllGroups = async (req, res) => {
    try {
        const groups = await groupService.getAllGroupsForUser(req.user.id);
        res.status(200).json({ status: 'success', data: { groups } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const joinGroup = async (req, res) => {
    try {
        const group = await groupService.joinGroupByCode(req.body.code, req.user.id);
        res.status(200).json({ status: 'success', data: { group } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

const updateGroup = async (req, res) => {
    try {
        const group = await groupService.updateGroup(req.params.id, req.body);
        res.status(200).json({ status: 'success', data: { group } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

const deleteGroup = async (req, res) => {
    try {
        await groupService.deleteGroup(req.params.id, req.user.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export {
    createGroup,
    getGroup,
    getAllGroups,
    joinGroup,
    updateGroup,
    deleteGroup,
}