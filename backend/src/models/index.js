import sequelize from "../config/db.js";
import User from "./User.js";
import Expense from "./Expense.js";
import ExpenseSplit from "./ExpenseSplit.js";
import Group from "./Group.js";
import GroupExpense from "./GroupExpense.js";
import GroupMember from "./GroupMember.js";


User.hasMany(Expense, {as:'expense', foreignKey: 'userId' });
User.belongsToMany(Group, { through: GroupMember, as:"groups", foreignKey: 'userId' });
User.hasMany(GroupExpense, { as: 'payer', foreignKey: 'payerId' });
User.belongsToMany(GroupExpense,{through:ExpenseSplit,as:"groupExpense",foreignKey:"userId"});
User.hasMany(Group,{as:"createdGroups",foreignKey:"createdBy"});

Expense.belongsTo(User, {as:"user", foreignKey: 'userId' });
Expense.belongsToMany(User,{through:ExpenseSplit,as:'participants',foreignKey:'expenseId'});
Expense.hasMany(ExpenseSplit, {as:"splits", foreignKey:'expenseId'});
Expense.belongsTo(User, {as:'payer', foreignKey:'payerId'})
Expense.belongsTo(Group, { through:GroupExpense, as:"group", foreignKey: 'groupId' });

Group.belongsToMany(User, { through: GroupMember, as:"members", foreignKey: 'groupId' });
Group.belongsTo(User, {as:"creator", foreignKey:"createdBy"});
Group.belongsToMany(Expense, { through:GroupExpense, foreignKey: 'groupId' });
Group.hasMany(GroupExpense, { as:"expenses",foreignKey: 'groupId' });

GroupMember.belongsTo(User, { foreignKey: 'userId' });
GroupMember.belongsTo(Group, { foreignKey: 'groupId' });

GroupExpense.belongsTo(Group, { foreignKey: 'groupId' });
GroupExpense.belongsTo(User, { as: 'payer', foreignKey: 'payerId' });
GroupExpense.hasMany(ExpenseSplit, { foreignKey: 'groupExpenseId' });

ExpenseSplit.belongsTo(GroupExpense, { foreignKey: 'groupExpenseId' });
ExpenseSplit.belongsTo(User, {as:"user", foreignKey: 'userId' });
ExpenseSplit.belongsTo(Expense, {as:"expense", foreignKey: 'expenseId' });

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