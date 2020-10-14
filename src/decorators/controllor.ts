import { RequestHandler } from 'express';
import { RequestMethod } from '../utils/types';

import router from '../router/index';

const getRoute = (root: string, path: string): string => {
	if (root === '/') {
		return path;
	}
	if (path.startsWith('/')) {
		return `${root}${path}`;
	} else {
		return `${root}/${path}`;
	}
};

// 类装饰器
// 遍历每一个被controller装饰的class
// 如果同时存在path和method这两个metaData,则认为是一个路由
// 将其添加到router中
export function controller(rootPath: string) {
	return function (target: any) {
		for (let key in target.prototype) {
			const path = Reflect.getMetadata('path', target.prototype, key);
			const method: RequestMethod = Reflect.getMetadata('method', target.prototype, key);
			const middleware: RequestHandler[] | undefined = Reflect.getMetadata('middleware', target.prototype, key);

			// path存在则说明设置了router,添加对应的路由
			if (path && method) {
				const realPath = getRoute(rootPath, path);
				if (middleware && middleware.length) {
					router[method](realPath, ...middleware, target.prototype[key]);
				} else {
					router[method](realPath, target.prototype[key]);
				}
			}
		}
	};
}
