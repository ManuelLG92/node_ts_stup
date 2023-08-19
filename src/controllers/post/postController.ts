import { Request, Response } from 'express';
import { ValidateBody } from '../validators/requestValidator';
import { testSchema } from './testValidator';
import { BaseController } from '../baseController';

export class PostController extends BaseController {
	@ValidateBody(testSchema)
	async execute(req: Request, res: Response) {
		const { body } = req;
		console.log('here...', body, 'dto');
		return res.status(200).json({ body });
	}
}
