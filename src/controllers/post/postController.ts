import { Request, Response } from 'express';
import { ValidateBody } from '../validators/requestValidator';
import { postDtoSchema } from './postDtoSchema';
import { BaseController } from '../baseController';

export class PostController extends BaseController {
	@ValidateBody(postDtoSchema)
	async execute(req: Request, res: Response) {
		const { body: dto }: { body: Zod.infer<typeof postDtoSchema> } = req;
		console.log('dto', dto);
		return res.status(200).json({ dto });
	}
}
