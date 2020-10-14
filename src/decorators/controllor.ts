import { RequestMethod } from '../utils/types';

import router from '../router/index';

// 类装饰器
// 遍历每一个被controller装饰的class
// 如果同时存在path和method这两个metaData,则认为是一个路由
// 将其添加到router中
export function controller(target: any) {
	for (let key in target.prototype) {
		const path = Reflect.getMetadata('path', target.prototype, key);
		const method: RequestMethod = Reflect.getMetadata('method', target.prototype, key);
		if (path && method) {
			// path存在则说明设置了router,添加对应的路由
			router[method](path, target.prototype[key]);
		}
	}
}
