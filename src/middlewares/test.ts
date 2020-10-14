import { Request, Response, NextFunction } from 'express';

export function test(req: Request, res: Response, next: NextFunction): void {
	console.log('this is test muliti middleware...');
	next();
}
