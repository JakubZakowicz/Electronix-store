import { z } from 'zod';

export const checkoutSchema = z.object({
  firstName: z.string().min(3).max(48),
  lastName: z.string().min(3).max(48),
  email: z.string().email(),
  phoneNumber: z.string(),
  country: z.string(),
  city: z.string(),
  street: z.string(),
  postalCode: z.string(),
});