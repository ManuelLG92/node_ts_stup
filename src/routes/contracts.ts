import { NextFunction, Request, Response } from 'express';
import { BaseController } from 'src/controllers/baseController.js';

export enum RouterMethodsRegister {
	get = 'get',
	post = 'post',
	put = 'put',
	patch = 'patch',
	delete = 'delete',
}

export type RouterInterface = {
	method: RouterMethodsRegister;
	path: string;
	controller: BaseController;
	middlewares?: Middlewares;
};

export type Middlewares = (
	req: Request,
	response: Response,
	next: NextFunction,
) => void;
