import userService from "../services/userService.js"

const getUser = async (req, res)=> {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(400).json({status: 'fail', message:"User not found"})
        }
        res.status(200).json({status:'success', data: {user}})
    } catch (error) {
        res.status(500).json({status:"error", message:error.message})
    }
}

const updateUser = async (req,res)=> {
    try {
        const user = await userService.updateUser(req.params.id,req.body);
        if (!user) {
            return res.status(400).json({status: 'fail', message:"User not found"})
        }
        res.status(200).json({status:'success', data: {user}});
    } catch (error) {
        res.status(500).json({status:"error", message:error.message})
    }
}

const deleteUser = async (req,res)=> {
    try {
        await userService.deleteUser(req.params.id);
        res.status(204).json({status: 'success', data: null});
    } catch (error) {
        res.status(500).json({status:error, messasge:error.message});
    }
}

export {
    getUser,
    updateUser,
    deleteUser
};