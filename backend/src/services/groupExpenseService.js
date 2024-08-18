import { GroupExpense, ExpenseSplit, User } from "../models/index.js";
import { splitExactly, splitEqually, splitByPercentage } from "./expenseSplit.js";

export const createGroupExpense = async ({ lenderId, groupId, amount, description, type, date, borrowers }) => {
  const groupExpense = await GroupExpense.create({
    lenderId,
    groupId,
    amount,
    description,
    type,
    date,
  });

  // Split the expense based on the type
  const splitFunctions = {
    equal: splitEqually,
    exact: splitExactly,
    percentage: splitByPercentage,
  };

  const splitFunction = splitFunctions[type];
  if (!splitFunction) throw new Error("Invalid split type");

  await splitFunction(groupExpense, borrowers);
  return groupExpense;
};

export const getGroupExpenses = async (groupId) => {
  return await GroupExpense.findAll({
    where: { groupId },
    include: [
      {
        model: ExpenseSplit,
        as: "splits",
        include: [
          { model: User, as: "lender", attributes: ["username"] },
          { model: User, as: "borrower", attributes: ["username"] },
        ],
      },
    ],
  });
};

export const getGroupExpenseById = async (id, groupId) => {
  return await GroupExpense.findOne({
    where: { id, groupId },
    attributes: ["type", "date", "description", "amount"],
    include: [
      {
        model: ExpenseSplit,
        as: "splits",
        attributes: ["amount", "settled"],
        include: { model: User, as: "borrower", attributes: ["username"] },
      },
      { model: User, as: "lender", attributes: ["id", "username"] },
    ],
  });
};

export const updateGroupExpense = async (id, groupId, expenseData) => {
  const groupExpense = await GroupExpense.findOne({
    where: { id, groupId },
  });
  if (!groupExpense) throw new Error("No expense found");

  const updatedGroupExpense = await groupExpense.update(expenseData);

  // Update the splits based on the type only if the borrowers have changed
  if (expenseData.borrowers) {
    const splitFunctions = {
      equal: splitEqually,
      exact: splitExactly,
      percentage: splitByPercentage,
    };

    const splitFunction = splitFunctions[updatedGroupExpense.type];
    if (!splitFunction) throw new Error("Invalid split type");

    await splitFunction(updatedGroupExpense, expenseData.borrowers);
  }

  return updatedGroupExpense;
};

export const deleteGroupExpense = async (id, groupId) => {
  const groupExpense = await GroupExpense.findOne({
    where: { id, groupId },
    include: { model: ExpenseSplit, as: "splits" },
  });

  if (!groupExpense) throw new Error("No expense found");

  await ExpenseSplit.destroy({ where: { groupExpenseId: id } });
  await groupExpense.destroy();
};

export const mySplits = async (groupId, userId) => {
  const splits = await ExpenseSplit.findAll({
    where: { groupExpenseId: groupId },
    attributes: ["id", "lenderId", "borrowerId", "amount", "settled"],
    include: [
      { model: User, as: "lender", attributes: ["username"] },
      { model: User, as: "borrower", attributes: ["username"] },
    ],
  });

  const borrowedExpenses = splits.filter((split) => split.borrowerId === userId);
  const lendedExpenses = splits.filter((split) => split.lenderId === userId);

  return { borrowedExpenses, lendedExpenses };
};

export const settleSplit = async (splitId, userId) => {
  const expenseSplit = await ExpenseSplit.findOne({
    where: { id: splitId, lenderId: userId },
  });
  if (!expenseSplit) throw new Error("No Split Found");

  return await expenseSplit.update({ settled: true });
};

export const deleteSplit = async (splitId, userId) => {
  const expenseSplit = await ExpenseSplit.findOne({
    where: { id: splitId, lenderId: userId },
  });
  if (!expenseSplit) throw new Error("No Split Found");

  const otherSplitsCount = await ExpenseSplit.count({
    where: { groupExpenseId: expenseSplit.groupExpenseId },
  });

  await expenseSplit.destroy();

  if (otherSplitsCount === 1) {
    const groupExpense = await GroupExpense.findOne({
      where: { id: expenseSplit.groupExpenseId },
    });

    if (groupExpense) {
      await groupExpense.destroy();
      return { message: "Group Expense and its last split deleted successfully." };
    }
  }
};

const groupExpenseService = {
  createGroupExpense,
  getGroupExpenses,
  getGroupExpenseById,
  updateGroupExpense,
  deleteGroupExpense,
  settleSplit,
  mySplits,
  deleteSplit,
};

export default groupExpenseService;