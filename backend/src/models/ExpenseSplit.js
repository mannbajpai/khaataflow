import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ExpenseSplit = sequelize.define('ExpenseSplit', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    groupExpenseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'GroupExpenses',
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    settled:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

export default ExpenseSplit;