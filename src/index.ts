import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { pinoHttp } from 'pino-http';
import controllerRouter from './controllers';
import authMiddleware from './middlewares/authMiddleware';
import { UnprocessableEntity } from './errors/unprocessableEntity';
import { BaseError } from './errors/baseError';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(pinoHttp());
app.use(authMiddleware);

app.use('/', controllerRouter);

app.use((err: BaseError, req: Request, res: Response, next: NextFunction) => {
	console.log(err.stack);
	const message = {
		message: err.message ?? 'Internal Server Error',
		...(err.details && { details: err.details }),
	};
	const status = err instanceof UnprocessableEntity ? 422 : 500;
	res.status(status).json(message);
	return next();
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
