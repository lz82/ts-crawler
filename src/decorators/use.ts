import 'reflect-metadata';
import { RequestHandler } from 'express';

export function use(middleware: RequestHandler) {
	return function (target: any, name: string, descriptor: PropertyDescriptor) {
		let prevMiddlewares = Reflect.getMetadata('middleware', target, name) || [];
		Reflect.defineMetadata('middleware', [...prevMiddlewares, middleware], target, name);
	};
}
