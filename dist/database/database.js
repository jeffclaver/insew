"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const sequelize_1 = require("sequelize");
exports.database = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'insew_development',
    username: 'insew',
    password: 'In5eW#2023!',
    define: {
        underscored: true
    }
});
