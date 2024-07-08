import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const GroupMember = sequelize.define('GroupMember',{
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
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    joinedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

export default GroupMember;