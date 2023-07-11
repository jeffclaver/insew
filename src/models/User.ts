import { Optional, Model, DataTypes } from "sequelize";
import { database } from "../database/database";

export interface User {
id: number;
email: string;
password: string;
name: string;
lastName: string;
birthDate: Date;
address: string;
numberAddress: string;
complement: string;
city: string;
state: string;
cellphone: string;
}

export interface UserCreationAttributes extends Optional<User, 'id'> {}

export interface UserInstance
extends Model<User, UserCreationAttributes>,
User {}

export const User = database.define<UserInstance, User>("users", {
id: {
allowNull: false,
autoIncrement: true,
primaryKey: true,
type: DataTypes.INTEGER,
},
email: {
type: DataTypes.STRING,
allowNull: false,
unique: true,
},
password: {
type: DataTypes.STRING,
allowNull: false,
},
name: {
type: DataTypes.STRING,
allowNull: false,
},
lastName: {
type: DataTypes.STRING,
allowNull: false,
},
birthDate: {
type: DataTypes.DATE,
allowNull: false,
},
address: {
type: DataTypes.STRING,
allowNull: false,
},
numberAddress: {
type: DataTypes.STRING,
allowNull: false,
},
complement: {
type: DataTypes.STRING,
allowNull: true,
},
city: {
type: DataTypes.STRING,
allowNull: false,
},
state: {
type: DataTypes.STRING,
allowNull: false,
},
cellphone: {
type: DataTypes.STRING,
allowNull: false,
},
});




