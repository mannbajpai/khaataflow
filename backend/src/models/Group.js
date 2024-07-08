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
    createdAt: {
        type: DataTypes.DATE,
        defaultValues: DataTypes.NOW,
    },
});

export default Group;