import { z } from 'zod';

export const personalDataStepSchema = z.object({
  firstName: z.string().min(1, 'Informe o seu primeiro nome'),
  lastName: z.string().min(1, 'Informe o seu sobrenome'),
  document: z.string().min(1, 'Informe o CPF'),
});
