import 'reflect-metadata';

import { RequestMethod } from '../utils/types';

// 方法装饰器工厂
// 根据传入的方法，返回对应方法的装饰器
function createRequestDecorator(method: RequestMethod) {
	return function (path: string) {
		//
		return function (target: any, name: string, descriptor: PropertyDescriptor) {
			Reflect.defineMetadata('path', path, target, name);
			Reflect.defineMetadata('method', method, target, name);
		};
	};
}

export const get = createRequestDecorator('get');
export const post = createRequestDecorator('post');
