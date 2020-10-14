import { Request, Response, NextFunction } from 'express';

export function checkLogin(req: Request, res: Response, next: NextFunction): void {
	const isLogin = req.session?.isLogin;

	if (isLogin) {
		next();
	} else {
		res.send('请先登录');
	}
}
