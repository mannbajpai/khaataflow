import userService from "../services/userService.js"

const getAllUsers = async(req,res)=> {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({status:'success', data:users});
    } catch (error) {
        res.status(401).json({status: fail, message: error.message});
    }
}

const getUser = async (req, res)=> {
    try {
        const user = await userService.getUserById(req.user.id);
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
        const user = await userService.updateUser(req.user.id,req.body);
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
        await userService.deleteUser(req.user.id);
        res.status(204).json({status: 'success', message: "User Deleted successfully"});
    } catch (error) {
        res.status(500).json({status:error, messasge:error.message});
    }
}

export {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
};