import { Request, Response, Router } from "express"
import { authenticateJwt } from "../middlewares/authMiddleware";
import { addPropertyValidate } from "../middlewares/validators";
import { prisma } from "../config/dbconfig";

export const propertyRouter =  Router();
propertyRouter.post('/add', authenticateJwt , async (req: Request, res: Response) => {
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
  