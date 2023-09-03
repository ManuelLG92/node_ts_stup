import { NextFunction, Request, Response, Router } from 'express';
import { PostController } from 'src/controllers/post/postController';

const controllerRouter = Router();
controllerRouter
	.route('/')
	.get((req: Request, res: Response) => {
		res.send('Express + TypeScript Server');
	})
	.post(async (req: Request, res: Response, next: NextFunction) => {
		const instance = new PostController();
		return Promise.resolve(instance.execute(req, res))
			.then((r) => r)
			.catch((e) => next(e));
	});

export default controllerRouter;
