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
  return await GroupExpense.findOne({
    where: { id, groupId },
    attributes: ["type", "date", "description", "amount"],
    include: [
      {
        model: ExpenseSplit, as: "splits", attributes: ["amount", "settled"],
        include: { model: User, as: "borrower", attributes: ["username"] }
      },
      { model: User, as: "lender", attributes: ["username"] }
    ]
  });
}

export const updateGroupExpense = async (id, groupId, expenseData) => {
  const groupExpense = await GroupExpense.findOne({ where: { id, groupId } })
  if (!groupExpense) throw new Error("No expense Found");
  return await groupExpense.update(expenseData);
}

export const deleteGroupExpense = async (id, groupId) => {
  const groupExpense = await GroupExpense.findOne({ where: { id, groupId } });
  if (!groupExpense) throw new Error("No expense found");
  await ExpenseSplit.destroy({ where: { groupExpenseId: id } });
  return await groupExpense.destroy();
}

const mySplits = async (groupId, userId) => {
  const borrowedExpenses = await GroupExpense.findAll({
    where: { groupId },
    attributes: [],
    include: [
      {
        model: ExpenseSplit,
        as: 'splits',
        where: {
          borrowerId: userId
        },
        attributes: ["id", "lenderId", "amount", "settled"],
        include: {
          model: User,
          as: "lender",
          attributes: ["username"]
        }
      }
    ]
  });
  const lendedExpenses = await GroupExpense.findAll({
    where: { groupId },
    attributes: [],
    include: [
      {
        model: ExpenseSplit,
        as: 'splits',
        where: {
          lenderId: userId
        },
        attributes: ["id", "borrowerId", "amount", "settled"],
        include: {
          model: User,
          as: "borrower",
          attributes: ["username"]
        }
      }
    ]
  });
  return { borrowedExpenses, lendedExpenses };
}

export const settleSplit = async (splitId, userId) => {
  const expenseSplit = await ExpenseSplit.findOne({ where: { id: splitId, lenderId: userId } });
  if (!expenseSplit) throw new Error("No Split Found");
  return await expenseSplit.update({ settled: true });
}

export const deleteSplit = async (splitId, userId) => {
  const expenseSplit = await ExpenseSplit.findOne({
    where: { id: splitId, lenderId: userId }
  });
  if (!expenseSplit) throw new Error("No Split Found");
  const { groupExpenseId } = expenseSplit;

  const otherSplits = await ExpenseSplit.findAll({
    where: { groupExpenseId },
  });
  // Delete the expense split
  await expenseSplit.destroy();

  // If there are no other splits, delete the entire groupExpense
  if (otherSplits.length === 1) { // Only one split exists, which is being deleted
    const groupExpense = await GroupExpense.findOne({
      where: { id: groupExpenseId },
    });

    if (groupExpense) {
      await groupExpense.destroy();
      return { message: "Group Expense and its last split deleted successfully." };
    }
  }
}

const groupExpenseService = {
  createGroupExpense,
  getGroupExpenses,
  getGroupExpenseById,
  updateGroupExpense,
  deleteGroupExpense,
  settleSplit,
  mySplits,
  deleteSplit,
}

export default groupExpenseService;
