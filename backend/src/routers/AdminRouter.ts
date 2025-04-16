import { Request, Response, Router } from "express"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from "../config/dbconfig";
import { loginValidate } from "../middlewares/validators";
import { authenticateJwt } from "../middlewares/authMiddleware";
export const adminRouter =  Router();

const generateAuthToken = (id: number) => {
    return jwt.sign({ id }, process.env.JWTPRIVATEKEY!);
};

// remember to remove this
adminRouter.post('/register', async (req: Request, res: Response) => {
    try {

        console.log(req.body)
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await prisma.admin.create({
            data: { ...req.body, password: hashPassword }
        });

        const token = generateAuthToken(newUser.id);

        res.status(201).send({ authToken: token, message: "Signed in successfully", success: true });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error", success: false });
    }
});

adminRouter.post('/login', async (req, res) => {
    try {
        const { error } = loginValidate(req.body);

        if (error) {
            const errors: Record<string, string> = {};
            error.forEach((err: { path: string[], message: string }) => {
                errors[err.path[0]] = err.message;
            });
            res.status(400).send({ errors, success: false });
        }

        const user = await prisma.admin.findUnique({ where: { email: req.body.email } });
        
        if (!user){
            res.status(401).send({ errors: { email: 'User with given email does not exist' }, success: false });
            return;
        }

        const validatePassword = await bcrypt.compare(req.body.password, user.password);

        if (!validatePassword){
            res.status(401).send({ errors: { password: 'Incorrect password' }, success: false });
            return;
        }

        const token = generateAuthToken(user.id);

        res.status(200).send({ authToken: token, message: "Logged in successfully", success: true });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error", success: false });
    }
});

adminRouter.get('/me', authenticateJwt, async (req: Request, res: Response) => {
    try {
        const user = await prisma.admin.findUnique({ where: { id: Number(req.headers.id) } });
        if (!user) res.status(400).send({ message: "User does not exist", success: false });
        else {
            res.status(200).send({
                success: true,
                data: {
                    id: user.id,
                    email: user.email,
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: "Error getting user", error });
    }
});
