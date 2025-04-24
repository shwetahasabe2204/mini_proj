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
// POST /add
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
                videoPresentation: req.body.videoPresentation || '',
                locality: req.body.locality,
                projectAt: req.body.projectAt,
                constructionStage: req.body.constructionStage,
                amenties: req.body.ammenties || [],
                amountPerFlat: req.body.amountPerFlat,
                latitude: req.body.latitude || null,
                longitude: req.body.longitude || null,
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
        console.error(err);
        res.status(500).send({
            message: 'Internal server error',
            success: false,
        });
    }
}));
// GET /all
exports.propertyRouter.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { budget, city } = req.query;
        const filters = {};
        if (budget) {
            const parsedBudget = parseInt(budget, 10);
            if (!isNaN(parsedBudget)) {
                filters.amountPerFlat = {
                    lte: parsedBudget,
                };
            }
        }
        if (city && typeof city === 'string') {
            filters.OR = [
                {
                    locality: {
                        contains: city,
                        mode: 'insensitive',
                    },
                },
                {
                    address: {
                        contains: city,
                        mode: 'insensitive',
                    },
                },
            ];
        }
        const properties = yield dbconfig_1.prisma.property.findMany({
            where: filters,
            select: {
                id: true,
                title: true,
                address: true,
                image: true,
            },
        });
        res.status(200).send({
            success: true,
            data: properties,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            message: 'Internal server error',
            success: false,
        });
    }
}));
// GET /:id
exports.propertyRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const property = yield dbconfig_1.prisma.property.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                developer: true,
                address: true,
                tags: true,
                image: true,
                videoPresentation: true,
                locality: true,
                projectAt: true,
                constructionStage: true,
                amenties: true,
                amountPerFlat: true,
                latitude: true,
                longitude: true,
                propertyDetails: true,
            },
        });
        if (!property) {
            res.status(404).send({ success: false, message: 'Property not found' });
            return;
        }
        res.status(200).send({ success: true, data: property });
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
}));
