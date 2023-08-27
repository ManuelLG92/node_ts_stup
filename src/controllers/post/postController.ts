import { Request, Response } from 'express';
import { ValidateBody } from '../validators/requestValidator';
import { testSchema } from './testValidator';
import { BaseController } from '../baseController';

export class PostController extends BaseController {
	@ValidateBody(testSchema)
	async execute(req: Request, res: Response) {
		const { body: dto }: { body: Zod.infer<typeof testSchema> } = req;
		console.log('dto', dto);
		return res.status(200).json({ dto });
	}
}
