import express, { Request, Response } from 'express';
import { loginProcess } from '../controllers/loginController.mjs';
import jwt from 'jsonwebtoken';

export const logInRouter = express.Router();

logInRouter.post('/', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const loggedInUser = await loginProcess(username, password);

        if (!loggedInUser) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ username: loggedInUser.username }, process.env.JWT_SECRET as string);

        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 5); // Add 5 hours

        res.cookie('login', token, {
            expires: expirationDate,
            httpOnly: true,
        });

        res.status(200).json({ message: 'Login successful', token });
        console.log('Login successful for user:', loggedInUser.username);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});