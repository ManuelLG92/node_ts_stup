import { Request, Response } from 'express';
import { ValidateBody } from 'src/controllers/validators/requestValidator';
import { postDtoSchema } from 'src/controllers/post/postDtoSchema';
import { BaseController } from 'src/controllers/baseController';

export class PostController extends BaseController {
	@ValidateBody(postDtoSchema)
	async execute(req: Request, res: Response) {
		const { body: dto }: { body: Zod.infer<typeof postDtoSchema> } = req;
		console.log('dto', dto);
		return res.status(200).json({ ...dto });
	}
}
