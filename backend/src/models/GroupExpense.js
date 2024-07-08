import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const GroupExpense = sequelize.define('GroupExpense', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    groupId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Groups',
            key: 'id',
        },
    },
    payerId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

export default GroupExpense;