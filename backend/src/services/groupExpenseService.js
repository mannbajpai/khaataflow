import { GroupExpense, ExpenseSplit, User } from "../models/index.js";
import { splitExactly, splitEqually, splitByPercentage } from "./expenseSplit.js";

export const createGroupExpense = async ({ lenderId, groupId, amount, description, type, date, borrowers }) => {
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

export const getGroupExpenses = async (groupId) => {
  return await GroupExpense.findAll({
    where: { groupId },
    include: [{
      model: ExpenseSplit,
      as: "splits",
      include: [
        {
          model: User,
          as: "lender",
          attributes: ['username']
        },
        {
          model: User,
          as: "borrower",
          attributes: ['username']
        }
      ]
    }]
  })
}

export const getGroupExpenseById = async (id, groupId) => {
  return await GroupExpense.findOne({ where: { id, groupId }, include: [ExpenseSplit] });
}

export const updateGroupExpense = async (id, groupId, expenseData) => {
  const groupExpense = await GroupExpense.findOne({ where: { id, groupId } })
  if (!groupExpense) throw new Error("No expense Found");
  return await groupExpense.update(expenseData);
}

export const deleteGroupExpense = async (id, groupId) => {
  const groupExpense = GroupExpense.findOne({ where: { id, groupId } });
  if (!groupExpense) throw new Error("No expense found");
  await ExpenseSplit.destroy({ where: { groupExpenseId: id } });
  return await groupExpense.destroy();
}

export const myBorrowedSplits = async (groupId, userId) => {
  return await GroupExpense.findAll({ 
    where: { groupId },
    include: [
      {
        model: ExpenseSplit,
        where: {borrowerId: userId}
      }
    ]
  });
}

export const myLendenedSplits = async (userId, groupId) => {
  {
    return await GroupExpense.findAll({ 
      where: { groupId },
      include: [
        {
          model: ExpenseSplit,
          where: {lenderId: userId}
        }
      ]
    });
  }
}

export const mySplits = async (groupId, userId) => {
  const borrowedSplits = await myBorrowedSplits(groupId, userId);
  const lendedSplits = await myLendenedSplits(groupId, userId);
  return { borrowedSplits, lendedSplits };
}

export const settleSplit = async (splitId, userId) => {
  const expenseSplit = await ExpenseSplit.findOne({ where: { id: splitId, userId } });
  if (!expenseSplit) throw new Error("No Split Found");
  return await expenseSplit.update({ settled: true });
}

const groupExpenseService = {
  createGroupExpense,
  getGroupExpenses,
  getGroupExpenseById,
  updateGroupExpense,
  deleteGroupExpense,
  settleSplit,
  mySplits,
}

export default groupExpenseService;
