import express, {Express} from 'express';
import dotenv from 'dotenv';
import { pinoHttp } from 'pino-http';
import controllerRouter from './controllers';
import authMiddleware from './middlewares/authMiddleware';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(pinoHttp());
app.use(authMiddleware)

app.use('/', controllerRouter)

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
