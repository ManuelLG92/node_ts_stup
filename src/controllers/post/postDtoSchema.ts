import { z } from 'zod';

export const postDtoSchema = z
	.object({
		username: z.string().min(3).max(30),
		age: z.number().min(18).max(65),
	})
	.required();
