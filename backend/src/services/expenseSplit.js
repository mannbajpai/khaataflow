import { ExpenseSplit } from "../models/index.js";
export const splitEqually = async (groupExpense, borrowers) => {
    const { amount,lenderId, id: groupExpenseId } = groupExpense;
    const splitAmount = amount / borrowers.length;

    for (const {borrowerId} of borrowers) {
        await ExpenseSplit.create({
            groupExpenseId,
            lenderId,
            borrowerId,
            amount: splitAmount,
        });
    }
}

export const splitExactly = async (groupExpense, borrowerAmounts) => {
    const { id: groupExpenseId, lenderId } = groupExpense;

    for (const { borrowerId, amount } of borrowerAmounts) {
        await ExpenseSplit.create({
            groupExpenseId,
            lenderId,
            borrowerId,
            amount,
        });
    }
}

export const splitByPercentage = async (groupExpense, borrowerPercentages) => {
    const { amount, id: groupExpenseId, lenderId } = groupExpense;
    for (const { borrowerId, percentage } of borrowerPercentages) {
        const splitAmount = ((amount) * percentage) / 100;
        await ExpenseSplit.create({
            groupExpenseId,
            borrowerId,
            lenderId,
            amount: splitAmount,
        });
    }
}