import {User, Expense, GroupExpense, ExpenseSplit} from "../models/index.js"

const createExpense = async(expenseData, userId) => {
    const {description, amount, payerId, groupId, splits } = expenseData;
    const expense = await Expense.create({
        description,
        amount,
        payerId,
        groupId,
        createdBy: userId,
    });

    for (const split of splits) {
        await ExpenseSplit.create({
            expenseId: expense.isSoftDeleted,
            userId: split.userId,
            amount: split.amount,
        });
    }

    return expense;
}

const getExpenseById = async (id) => {
    return await Expense.findByPk(id, {
        include: [
            {model: User, as: 'payer'},
            {model: ExpenseSplit, include: [{model: User}]},
        ],
    });
}

const getAllExpensesByGroup = async(groupId) => {
    return await Expense.findAll({
        where: {groupId: groupId},
        include: [
            {model: User, as:'payer'},
            {model: ExpenseSplit, include:[{model:User}]}
        ]
    })
}

const updateExpense = async(id,data) => {
    const expense = await Expense.findByPk(id);
    if (!expense) throw new Error('Expense Not Found');
    Object.assign(expense,data);
    await expense.save();
    return expense;
}

const deleteExpense= async (id) => {
    const expense = await Expense.findByPk(id);
    if (!expense) throw new Error("Expense Not Found");
    await expense.destroy();
    return expense;
}

const expenseService = {
    createExpense,
    getExpenseById,
    getAllExpensesByGroup,
    updateExpense,
    deleteExpense
}

export default expenseService;