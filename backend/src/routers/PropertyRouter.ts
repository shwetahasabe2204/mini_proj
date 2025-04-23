import { Request, Response, Router } from "express";
import { authenticateJwt } from "../middlewares/authMiddleware";
import { addPropertyValidate } from "../middlewares/validators";
import { prisma } from "../config/dbconfig";

export const propertyRouter = Router();

// POST /add
propertyRouter.post('/add', authenticateJwt, async (req: Request, res: Response) => {
  try {
    const { error } = addPropertyValidate(req.body);

    if (error) {
      const errors: Record<string, string> = {};
      error.forEach((err: { path: string[]; message: string }) => {
        errors[err.path[0]] = err.message;
      });
      res.status(400).send({ errors, success: false });
      return;
    }

    const newProperty = await prisma.property.create({
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
        amountPerFlat: req.body.amountPerFlat,
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
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Internal server error',
      success: false,
    });
  }
});
// GET /all
propertyRouter.get('/all', async (req: Request, res: Response) => {
  try {
    const { budget, city } = req.query;

    const filters: any = {};

    if (budget) {
      const parsedBudget = parseInt(budget as string, 10);
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

    const properties = await prisma.property.findMany({
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
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: 'Internal server error',
      success: false,
    });
  }
});


propertyRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const property = await prisma.property.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        developer: true,
        address: true,
        tags: true,
        image: true,
        videpPresentation: true,
        locality: true,
        projectAt: true,
        constructionStage: true,
        ammenties: true,
        amountPerFlat: true,
        propertyDetails: true,
      },
    });

    if (!property) {
      res.status(404).send({ success: false, message: 'Property not found' });
      return;
    }

    res.status(200).send({ success: true, data: property });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
});
