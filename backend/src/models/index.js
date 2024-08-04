import sequelize from "../config/db.js";
import User from "./User.js";
import Expense from "./Expense.js";
import ExpenseSplit from "./ExpenseSplit.js";
import Group from "./Group.js";
import GroupExpense from "./GroupExpense.js";
import GroupMember from "./GroupMember.js";


User.hasMany(Expense, {as:'expense', foreignKey: 'userId' });
User.belongsToMany(Group, { through: GroupMember, as:"groups", foreignKey: 'userId' });
User.hasMany(Group,{as:"createdGroups",foreignKey:"createdBy"});
User.hasMany(GroupExpense, { foreignKey: 'lenderId', as: 'lendedExpenses' });
User.hasMany(ExpenseSplit, { foreignKey: 'lenderId', as: 'lendedExpense' });
User.hasMany(ExpenseSplit, { foreignKey: 'borrowerId', as: 'borrowedExpenses' });

Expense.belongsTo(User, {as:"user", foreignKey: 'userId' });

Group.belongsToMany(User, { through: GroupMember, as:"members", foreignKey: 'groupId' });
Group.belongsTo(User, {as:"creator", foreignKey:"createdBy"});
Group.hasMany(GroupExpense, { as:"expenses",foreignKey: 'groupId' });

GroupMember.belongsTo(User, { foreignKey: 'userId' });
GroupMember.belongsTo(Group, { foreignKey: 'groupId' });

GroupExpense.belongsTo(User, { foreignKey: 'lenderId', as: 'lender' });
GroupExpense.belongsTo(Group, { foreignKey: 'groupId', as: 'group' });
GroupExpense.hasMany(ExpenseSplit, { foreignKey: 'groupExpenseId', as: 'splits' });

ExpenseSplit.belongsTo(GroupExpense, {as:"groupExpense", foreignKey: 'groupExpenseId' });
ExpenseSplit.belongsTo(User, {as:"lender", foreignKey:"lenderId"});
ExpenseSplit.belongsTo(User, {as:"borrower", foreignKey: 'borrowerId' });

const syncDb = async () => {
    try {
        await sequelize.sync({alter:true});
        console.log("Databased Synced");
    } catch (error) {
        console.log("Database Syncing Error!", error);
    }
}

export {
    syncDb,
    User,
    Group,
    GroupExpense,
    GroupMember,
    Expense,
    ExpenseSplit,
}