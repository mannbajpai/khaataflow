import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Group = sequelize.define('Group', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValues: DataTypes.NOW,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        references: {
            model: "Users",
            key: "id"
        }
    },
    code: {
        type: DataTypes.STRING,
        unique: true,
    }
});

export default Group;