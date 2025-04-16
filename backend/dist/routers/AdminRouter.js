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
exports.adminRouter = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbconfig_1 = require("../config/dbconfig");
const validators_1 = require("../middlewares/validators");
const authMiddleware_1 = require("../middlewares/authMiddleware");
exports.adminRouter = (0, express_1.Router)();
const generateAuthToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWTPRIVATEKEY);
};
// remember to remove this
exports.adminRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const salt = yield bcrypt_1.default.genSalt(Number(process.env.SALT));
        const hashPassword = yield bcrypt_1.default.hash(req.body.password, salt);
        const newUser = yield dbconfig_1.prisma.admin.create({
            data: Object.assign(Object.assign({}, req.body), { password: hashPassword })
        });
        const token = generateAuthToken(newUser.id);
        res.status(201).send({ authToken: token, message: "Signed in successfully", success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error", success: false });
    }
}));
exports.adminRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, validators_1.loginValidate)(req.body);
        if (error) {
            const errors = {};
            error.forEach((err) => {
                errors[err.path[0]] = err.message;
            });
            res.status(400).send({ errors, success: false });
        }
        const user = yield dbconfig_1.prisma.admin.findUnique({ where: { email: req.body.email } });
        if (!user) {
            res.status(401).send({ errors: { email: 'User with given email does not exist' }, success: false });
            return;
        }
        const validatePassword = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!validatePassword) {
            res.status(401).send({ errors: { password: 'Incorrect password' }, success: false });
            return;
        }
        const token = generateAuthToken(user.id);
        res.status(200).send({ authToken: token, message: "Logged in successfully", success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error", success: false });
    }
}));
exports.adminRouter.get('/me', authMiddleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield dbconfig_1.prisma.admin.findUnique({ where: { id: Number(req.headers.id) } });
        if (!user)
            res.status(400).send({ message: "User does not exist", success: false });
        else {
            res.status(200).send({
                success: true,
                data: {
                    id: user.id,
                    email: user.email,
                }
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: "Error getting user", error });
    }
}));
