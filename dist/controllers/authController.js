"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registerUser = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name, lastName, birthDate, address, numberAddress, complement, city, state, cellphone } = req.body;
        const existingUser = yield User_1.User.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ error: "E-mail já cadastrado" });
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield User_1.User.create({
            email,
            password: hashPassword,
            name,
            lastName,
            birthDate,
            address,
            numberAddress,
            complement,
            city,
            state,
            cellphone,
        });
        return res.status(201).json({ message: 'Usuário registrado com sucesso!', user: user });
    }
    catch (err) {
        console.error(`O erro está sendo ${err}`);
        return res.status(500).json({ error: "Erro no registro de usuário" });
    }
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, 'chave-secreta', {
            expiresIn: '1h',
        });
        return res.status(200).json({ token });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
exports.login = login;
