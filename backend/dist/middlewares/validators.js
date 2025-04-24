"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPropertyValidate = exports.loginValidate = void 0;
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
const addPropertyValidate = (data) => {
    const schema = zod_1.z.object({
        title: zod_1.z.string().min(1, { message: 'Title is required' }),
        developer: zod_1.z.string().min(1, { message: 'Developer is required' }),
        address: zod_1.z.string().min(1, { message: 'Address is required' }),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        image: zod_1.z
            .array(zod_1.z.string().url({ message: 'Image must be a valid URL' }))
            .optional(),
        videoPresentation: zod_1.z
            .string()
            .url({ message: 'Video presentation must be a valid URL' })
            .optional(),
        locality: zod_1.z.string().min(1, { message: 'Locality is required' }),
        projectAt: zod_1.z.string().min(1, { message: 'Project date is required' }),
        constructionStage: zod_1.z
            .string()
            .min(1, { message: 'Construction stage is required' }),
        amenties: zod_1.z.array(zod_1.z.string()).optional(),
        amountPerFlat: zod_1.z
            .number({ invalid_type_error: 'Amount per flat must be a number' })
            .positive({ message: 'Amount per flat must be a positive number' }),
        latitude: zod_1.z.number().min(-90).max(90).optional().nullable(),
        longitude: zod_1.z.number().min(-180).max(180).optional().nullable(),
        propertyDetails: zod_1.z
            .array(zod_1.z.object({
            key: zod_1.z
                .string()
                .min(1, { message: 'Property detail key is required' }),
            value: zod_1.z
                .string()
                .min(1, { message: 'Property detail value is required' }),
        }))
            .optional(),
    });
    try {
        schema.parse(data);
        return { error: null };
    }
    catch (e) {
        return { error: e.errors };
    }
};
exports.addPropertyValidate = addPropertyValidate;
