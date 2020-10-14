import { Request, Response } from 'express';
import { controller, get, use } from '../decorators';
import { checkLogin, test } from '../middlewares';
import { getSuccess, getFail } from '../utils/result';

import Crawler from '../utils/crawler';

import WeiboHotSearchParser from '../parser/hot-search';

import fs from 'fs';
import path from 'path';

interface BodyRequest extends Request {
	body: {
		[key: string]: any;
	};
}

@controller('/data')
class CrawlerController {
	@get('/getData')
	@use(checkLogin)
	@use(test)
	getData(req: Request, res: Response) {
		try {
			// 输出文件路径
			const outputPath = path.resolve(__dirname, '../../output/hot-search.json');
			const hsParser = WeiboHotSearchParser.getInstance(outputPath);

			const crawler = new Crawler(hsParser);
			crawler.parseData();
			res.json(getSuccess('爬取成功...'));
		} catch (err) {
			res.json(getFail('爬取数据失败。。。'));
		}
	}

	@get('/showData')
	showData(req: Request, res: Response) {
		try {
			const filePath = path.resolve(__dirname, '../../output/hot-search.json');
			const content = fs.readFileSync(filePath, 'utf-8');
			res.json(getSuccess(JSON.parse(content)));
		} catch (err) {
			res.json(getFail(err));
		}
	}
}

export default CrawlerController;
