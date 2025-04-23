import { z } from 'zod';

export const loginValidate = (data: any) => {
  const schema = z.object({
    email: z
      .string()
      .email({ message: 'Please enter a valid email address' })
      .min(1, { message: 'Email is required' }),
    password: z
      .string()
      .min(1, { message: 'Password is required' }),
  });

  try {
    schema.parse(data);
    return { error: null };
  } catch (e: any) {
    return { error: e.errors };
  }
};

export const addPropertyValidate = (data: any) => {
  const schema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    developer: z.string().min(1, { message: 'Developer is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
    tags: z.array(z.string()).optional(),
    image: z.array(z.string().url({ message: 'Image must be a valid URL' })).optional(),
    videpPresentation: z.string().url({ message: 'Video presentation must be a valid URL' }).optional(),
    locality: z.string().min(1, { message: 'Locality is required' }),
    projectAt: z.string().min(1, { message: 'Project date is required' }),
    constructionStage: z.string().min(1, { message: 'Construction stage is required' }),
    ammenties: z.array(z.string()).optional(),
    amountPerFlat: z
      .number({ invalid_type_error: 'Amount per flat must be a number' })
      .positive({ message: 'Amount per flat must be a positive number' }),
    propertyDetails: z.array(
      z.object({
        key: z.string().min(1, { message: 'Property detail key is required' }),
        value: z.string().min(1, { message: 'Property detail value is required' }),
      })
    ).optional(),
  });

  try {
    schema.parse(data);
    return { error: null };
  } catch (e: any) {
    return { error: e.errors };
  }
};
