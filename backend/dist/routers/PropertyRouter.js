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
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validators_1 = require("../middlewares/validators");
const dbconfig_1 = require("../config/dbconfig");
exports.propertyRouter = (0, express_1.Router)();
exports.propertyRouter.post('/add', authMiddleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, validators_1.addPropertyValidate)(req.body);
        if (error) {
            const errors = {};
            error.forEach((err) => {
                errors[err.path[0]] = err.message;
            });
            res.status(400).send({ errors, success: false });
            return;
        }
        const newProperty = yield dbconfig_1.prisma.property.create({
            data: {
                title: req.body.title,
                developer: req.body.developer,
                address: req.body.address,
                tags: req.body.tags || [],
                image: req.body.image || [],
                videpPresentation: req.body.videpPresentation || '',
                locality: req.body.locality,
                projectAt: req.body.projectAt,
                constructionStage: req.body.constructionStage,
                ammenties: req.body.ammenties || [],
                propertyDetails: {
                    create: req.body.propertyDetails || [],
                },
            },
        });
        res.status(201).send({
            success: true,
            message: 'Property added successfully',
            data: newProperty,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Internal server error',
            success: false,
        });
    }
}));
