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
    createdBy: {
        type: DataTypes.INTEGER,
        references: {
            model: "Users",
            key: "id"
        }
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});

Group.beforeCreate((group) => {
    group.code = generateUniqueCode();
});

const generateUniqueCode = async () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (await Group.findOne({where:{code}})){
        generateUniqueCode();
    } else{
        return code;
    }
}

export default Group;