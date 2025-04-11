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

