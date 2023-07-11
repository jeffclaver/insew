import { Sequelize } from "sequelize";

export const database = new Sequelize({
    dialect: 'postgres',
    host:'localhost',
    port: 5432,
    database: 'insew_development',
    username: 'insew',
    password: 'In5eW#2023!'
})