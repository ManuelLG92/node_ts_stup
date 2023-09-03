import express, {
	Express,
	NextFunction,
	Request,
	Response,
	Router,
} from 'express';
import dotenv from 'dotenv';
import { pinoHttp } from 'pino-http';
import authMiddleware from 'src/middlewares/authMiddleware';
import { UnprocessableEntity } from 'src/errors/unprocessableEntity';
import { BaseError } from 'src/errors/baseError';
import registerRoutes from 'src/routes/register/register';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(pinoHttp());
app.use(authMiddleware);

const router = Router();
registerRoutes(router);
app.use(router);

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
