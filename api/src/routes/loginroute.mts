import express, { Request, Response } from 'express';
import { loginProcess } from '../controllers/loginController.mjs';
import jwt from 'jsonwebtoken';

export const logInRouter = express.Router();

logInRouter.post('/', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) { // modifiera senare om det behövs
            return res.status(400).json({ message: 'Username and password are required' });
        } else {
            const loggedInUser = await loginProcess(username, password);

            if (!loggedInUser) {
                res.status(401).json({ message: 'Invalid username or password' });
            } else {
                const token = jwt.sign(loggedInUser, process.env.JWT_SECRET);

                const currentDate = new Date();
                const expirationDate = new Date(currentDate.getHours() + 5); // 5 hours from now

                res.cookie("login", token, {
                    expires: expirationDate,
                    httpOnly: false,
                });
                res.status(200).json({ message: 'Login successful', token });
                console.log('Login successful for user:', loggedInUser.username);
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });

    }
});