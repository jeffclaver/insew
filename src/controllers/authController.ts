import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password, name, lastName, birthDate, address, numberAddress, complement, city, state, cellphone } = req.body;

        const existingUser = await User.findOne({ where: { email: email } });

        if (existingUser) {
            return res.status(400).json({ error: "E-mail já cadastrado" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
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
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }
        const token = jwt.sign({ userId: user.id }, 'chave-secreta', {
            expiresIn: '1h',
        });

        return res.status(200).json({ token });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};