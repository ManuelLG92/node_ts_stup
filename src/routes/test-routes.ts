import { PostController } from 'src/controllers/post/postController';
import { RouterInterface, RouterMethodsRegister } from 'src/routes/contracts';

const TEST_PREFIX = '';
export const testRoutes: Array<RouterInterface> = [
	{
		method: RouterMethodsRegister.post,
		controller: new PostController(),
		path: TEST_PREFIX,
	},
];
