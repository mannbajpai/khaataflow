import { GroupExpense, ExpenseSplit } from "../models/index.js";
import { splitExactly,splitEqually,splitByPercentage } from "./expenseSplit.js";
const createGroupExpense = async ({ lenderId, groupId, amount, description, type, date, borrowers }) => {

    const groupExpense = await GroupExpense.create({
        lenderId,
        groupId,
        amount,
        description,
        type,
        date
      });
    // Split the expense based on the type
    switch (type) {
        case 'equal':
          await splitEqually(groupExpense, borrowers);
          break;
        case 'exact':
          await splitExactly(groupExpense, borrowers);
          break;
        case 'percentage':
          await splitByPercentage(groupExpense, borrowers);
          break;
        default:
          throw new Error('Invalid split type');
      }

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

const settleGroupExpense = async (splitId,userId) => {
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
