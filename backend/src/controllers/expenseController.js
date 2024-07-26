import expenseService from "../services/expenseService.js"

const createExpense = async(req,res) => {
    try {
        console.log("Creating expense : ");
        const expense = await expenseService.createExpense({ ...req.body}, req.user.dataValues.id);
        res.status(201).json({status: 'success', data: {expense}})
    } catch (error) {
        res.status(500).json({status: 'fail', message:error.message});
    }
}

const getExpense = async(req,res) => {
    try {
        const expense = await expenseService.getExpenseById(req.params.id, req.user.dataValues.id);
        res.status(201).json({status: 'success', data: {expense}});
    } catch (error) {
        res.status(501).json({status:'fail', message:error.message});
    }
}

const getAllExpenses = async(req,res) => {
    try {
        const expenses = await expenseService.getExpenses(req.user.dataValues.id);
        res.status(201).json({status: 'success', data: {expenses}});
    } catch (error) {
        res.status(500).json({status: 'fail', message:error.message})
    }
}

const updateExpense = async(req,res) => {
    try {
        const expense = await expenseService.updateExpense(req.params.id, req.body, req.user.dataValues.id);
        res.status(200).json({status:'success', data:{expense}});
    } catch (error) {
        res.status(501).json({status:'fail', message:error.message})
    }
}

const deleteExpense = async(req,res) => {
    try {
        await expenseService.deleteExpense(req.params.id, req.user.dataValues.id);
        res.status(204).json({status:'success', message:"Deleted Successfully"});
    } catch (error) {
        res.status(500).json({status:'fail', message:error.message})
    }
}

const expenseController = {
    createExpense,
    getExpense,
    getAllExpenses,
    updateExpense,
    deleteExpense,
}

export default expenseController;