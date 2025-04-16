"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidate = void 0;
const zod_1 = require("zod");
const loginValidate = (data) => {
    const schema = zod_1.z.object({
        email: zod_1.z
            .string()
            .email({ message: 'Please enter a valid email address' })
            .min(1, { message: 'Email is required' }),
        password: zod_1.z
            .string()
            .min(1, { message: 'Password is required' }),
    });
    try {
        schema.parse(data);
        return { error: null };
    }
    catch (e) {
        return { error: e.errors };
    }
};
exports.loginValidate = loginValidate;
