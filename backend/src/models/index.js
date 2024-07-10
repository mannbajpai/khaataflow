import sequelize from "../config/db.js";
import User from "./User.js";
import Expense from "./Expense.js";
import ExpenseSplit from "./ExpenseSplit.js";
import Group from "./Group.js";
import GroupExpense from "./GroupExpense.js";
import GroupMember from "./GroupMember.js";


User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

Group.belongsToMany(User, { through: GroupMember, foreignKey: 'groupId' })
User.belongsToMany(Group, { through: GroupMember, foreignKey: 'userId' });

Group.hasMany(GroupExpense, { foreignKey: 'groupId' });
GroupExpense.belongsTo(Group, { foreignKey: 'groupId' });

User.hasMany(GroupExpense, { as: 'payer', foreignKey: 'payerId' });
GroupExpense.belongsTo(User, { as: 'payer', foreignKey: 'payerId' });

GroupExpense.hasMany(ExpenseSplit, { foreignKey: 'groupExpenseId' });
ExpenseSplit.belongsTo(GroupExpense, { foreignKey: 'groupExpenseId' });

User.hasMany(ExpenseSplit, { foreignKey: 'userId' });
ExpenseSplit.belongsTo(User, { foreignKey: 'userId' });

const syncDb = async () => {
    try {
        await sequelize.sync();
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