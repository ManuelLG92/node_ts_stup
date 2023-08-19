import { Request, Response } from 'express';

export abstract class BaseController {
	abstract execute(req: Request, res: Response): Promise<Response>;
}
