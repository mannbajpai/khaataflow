import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Expense = sequelize.define('Expense', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        },
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM("income", "expense"),
        allowNull: false,
    }
});

export default Expense;