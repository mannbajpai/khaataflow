import { GroupExpense, ExpenseSplit } from "../models/index.js";

const createGroupExpense = async (expenseData, splits) => {
    
    // Validation od splits
    let toatalSplitAmount = 0;
    splits.forEach((split)=>{
        toatalSplitAmount += split.amount;
    });

    if (toatalSplitAmount !== expenseData.amount){
        throw new Error("Total Split Amount does not eqaul expense amount");
    }
    
    const groupExpense = await GroupExpense.create(expenseData);
    await ExpenseSplit.bulkCreate(
        splits.map((split) => ({
            ...split,
            groupExpenseId: groupExpense.id,
        }))
    );

    return groupExpense;
}

const getGroupExpenses = async (groupId) => {
    return await GroupExpense.findAll({ where: { groupId }, include: [ExpenseSplit] })
}

const getGroupExpenseById = async (id, groupId) => {
    return await GroupExpense.findOne({ where: { id, groupId }, include: [ExpenseSplit] });
}

const updateGroupExpense = async (id, groupId, expenseData) => {
    const groupExpense = await GroupExpense.findOne({ where: { id, groupId } })
    if (!groupExpense) throw new Error("No expense Found");
    return await groupExpense.update(expenseData);
}

const deleteGroupExpense = async (id, groupId) => {
    const groupExpense = GroupExpense.findOne({ where: { id, groupId } });
    if (!groupExpense) throw new Error("No expense found");
    await ExpenseSplit.destroy({ where: { groupExpenseId: id } });
    return await groupExpense.destroy();
}

const settleGroupExpense = async (splitId, userId) => {
    const expenseSplit = ExpenseSplit.findOne({ where: { id: splitId, userId } });
    if (!expenseSplit) throw new Error("No Split Found");
    return await expenseSplit.update({ settled: true });
}

const groupExpenseService = {
    createGroupExpense,
    getGroupExpenses,
    getGroupExpenseById,
    updateGroupExpense,
    deleteGroupExpense,
    settleGroupExpense
}

export default groupExpenseService;
