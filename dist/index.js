"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database/database");
const routes_1 = __importDefault(require("./routers/routes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.listen(port, () => {
    database_1.database.authenticate().then(() => {
        console.log('DB Connection is running');
    });
    console.log(`Server running on port ${port}`);
});
