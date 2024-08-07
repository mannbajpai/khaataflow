import groupExpenseServices from "../services/groupExpenseService.js";
const createGroupExpense = async (req, res) => {
    try {
        const { amount, description, type, date, borrowers } = req.body;
        const groupId = req.params.groupId;
        const lenderId = req.user.dataValues.id;

        const groupExpense = await groupExpenseServices.createGroupExpense({
            lenderId,
            groupId,
            amount,
            description,
            type,
            date,
            borrowers,
          });
        res.status(201).json({ status: 'success', data: groupExpense });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}

const getGroupExpenses = async (req, res) => {
    try {
        const expenses = await groupExpenseServices.getGroupExpenses(req.params.groupId);
        res.status(200).json({ status: 'success', data: expenses });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}

const getGroupExpenseById = async (req, res) => {
    try {
        console.log(req.params)
        const expense = await groupExpenseServices.getGroupExpenseById(req.params.expenseId, req.params.groupId);
        res.status(200).json({ status: 'success', data: expense });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}

const updateGroupExpense = async (req, res) => {
    try {
        const expense = await groupExpenseServices.updateGroupExpense(req.params.id, req.params.groupId, req.body);
        res.status(200).json({ status: 'success', data: expense })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const deleteGroupExpense = async (req, res) => {
    try {
         await groupExpenseServices.deleteGroupExpense(req.params.id, req.params.groupId);
        res.status(200).json({ status: 'success', message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
}

const getMySplits = async (req, res) => {
    try {
        const splits = await groupExpenseServices.mySplits(req.params.groupId, req.params.userId);
        res.status(200).json({ status: 'success',data:splits});
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message});
    }
}

const settleExpenseSplit = async (req, res) => {
    try {
        await groupExpenseServices.settleSplit(req.params.splitId, req.user.dataValues.id);
        res.status(200).send({status:"success", message: "Split settled" });
    } catch (error) {
        res.status(500).json({status:"fail", message: error.message });
    }
};

const deleteExpenseSplit = async (req, res) => {
    try {
        await groupExpenseServices.deleteSplit(req.params.splitId, req.user.dataValues.id);
        res.status(200).send({status:"success", message: "Split Deleted"});
    } catch (error) {
        res.status(500).json({status:"fail", message: error.message});
    }
}

const groupExpenseController = {
    createGroupExpense,
    getGroupExpenses,
    getGroupExpenseById,
    updateGroupExpense,
    deleteGroupExpense,
    settleExpenseSplit,
    getMySplits,
    deleteExpenseSplit
}

export default groupExpenseController;