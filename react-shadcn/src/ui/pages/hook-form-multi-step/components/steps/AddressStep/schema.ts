import { z } from 'zod';

export const addressStepSchema = z.object({
  state: z.string().min(1, 'Informe o estado'),
  city: z.string().min(1, 'Informe a cidade'),
  street: z.string().min(1, 'Informe a rua'),
});
