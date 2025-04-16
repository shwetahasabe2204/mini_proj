"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminRouter_1 = require("./routers/AdminRouter");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/admin', AdminRouter_1.adminRouter);
app.get('/', (req, res) => {
    res.send('hi');
});
app.listen(3000, () => {
    console.log("Server has been strated");
});
