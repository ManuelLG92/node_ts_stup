import { Router } from 'express';
import { routes } from '..';

const registerRoutes = (router: Router) => {
	routes.forEach((route) => {
		console.log(
			`Path: /${route.path} - Method: ${route.method} - Controller: ${route.controller.constructor.name}`,
		);
		router[route.method](`/${route.path}`, (req, res, next) => {
			return [
				...(route.middlewares?.length
					? Object.values(route.middlewares).map((it) =>
							it(req, res, next),
					  )
					: []),
				Promise.resolve(route.controller?.execute(req, res))
					.then((r) => r)
					.catch((e) => next(e)),
			];
		});
	});
};

export default registerRoutes;
