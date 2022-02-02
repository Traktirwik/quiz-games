import  User  from './user.model';
import sequelize from '../data_base/db.connect';
import { DataTypes } from 'sequelize';

const Token = sequelize.define(
    "tokens",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "refresh_token"
        },
        
    },
);

Token.belongsTo(User, {foreignKey: {
    name: 'user_id',
    allowNull: false,
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
});


export default Token;