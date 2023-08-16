import { Request, Response, Router } from 'express';

const controllerRouter = Router();
controllerRouter
	.route('/')
	.get((req: Request, res: Response) => {
		res.send('Express + TypeScript Server');
	})
	.post((req: Request, res: Response) => {
		console.log(`body: ${JSON.stringify(req.body)}`);
		res.json({ data: req.body });
	});

export default controllerRouter;