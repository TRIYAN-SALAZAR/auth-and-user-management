'use strict';

import { DataTypes } from "sequelize";

function User(sequelize) {
    const User = sequelize.define('User', {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        name: {
        type: DataTypes.STRING,
        allowNull: false
        },
        email: {
        type: DataTypes.STRING,
        allowNull: false
        },
        password: {
        type: DataTypes.STRING,
        allowNull: false
        }
    });
    
    return User;
}

export default User;