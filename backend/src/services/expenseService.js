import { User, Expense, GroupExpense, ExpenseSplit } from "../models/index.js"

const createExpense = async (expenseData, userId) => {
    const { description, name, category, amount, date } = expenseData;
    return await Expense.create({
        description,
        amount,
        name,
        category,
        date,
        userId
    });
}

const getExpenses = async (userId) => {
    return await Expense.findAll({ where: { userId } });
}

const getExpenseById = async (id, userId) => {
    return await Expense.findOne({ where: { id, userId } })
}


const updateExpense = async (id, data, userId) => {
    const expense = await Expense.findByPk({where: {id, userId}});
    if (!expense) throw new Error('Expense Not Found');
    Object.assign(expense, data);
    await expense.save();
    return expense;
}

const deleteExpense = async (id, userId) => {
    const expense = await Expense.findByPk({where: {id,userId}});
    if (!expense) throw new Error("Expense Not Found");
    await expense.destroy();
    return expense;
}

const expenseService = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
}

export default expenseService;