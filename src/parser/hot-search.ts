import cheerio from 'cheerio';
import fs from 'fs';
import dayjs from 'dayjs';

interface INews {
	no: number;
	title: string;
	href: string;
}

interface IContent {
	[param: string]: INews[];
}

export default class WeiboHotSearchParser {
	public url = 'https://s.weibo.com/top/summary?cate=realtimehot';
	private static instance: WeiboHotSearchParser;

	// 设为private来禁用构造函数
	private constructor(private outputPath: string) {}

	// 单例模式
	public static getInstance(outputPath: string) {
		if (!WeiboHotSearchParser.instance) {
			WeiboHotSearchParser.instance = new WeiboHotSearchParser(outputPath);
		}
		return WeiboHotSearchParser.instance;
	}

	/**
	 *
	 * @param content superagent解析出来的结果
	 * 返回结构化的新闻列表
	 */
	private getHtml(content: string) {
		const $ = cheerio.load(content);
		const list = $('#pl_top_realtimehot > table > tbody > tr');
		let ret: INews[] = [];
		list.map((index: number, item: CheerioElement) => {
			const link = $(item).find('.td-02 > a').eq(0);
			ret.push({ no: index, title: link.text(), href: 'https://s.weibo.com/' + link.attr('href') || '' });
		});
		return ret;
	}

	// 将结构化的数据保存在本地指定的路径下
	private exportData(data: IContent) {
		if (fs.existsSync(this.outputPath)) {
			let content = JSON.parse(fs.readFileSync(this.outputPath, 'utf-8')) as IContent;
			Object.keys(data).forEach((key) => {
				content[key] = data[key];
			});
			fs.writeFileSync(this.outputPath, JSON.stringify(content));
		} else {
			fs.writeFileSync(this.outputPath, JSON.stringify(data));
		}
	}

	// 对外暴露的方法
	parse(content: string) {
		const newsList = this.getHtml(content);

		const key = dayjs().format('YYYY-MM-DD-HH-mm-ss');

		const newContent = {
			[key]: newsList,
		};
		this.exportData(newContent);
	}
}
