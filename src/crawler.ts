import superagent from 'superagent';
import cheerio from 'cheerio';
import path from 'path';
import fs from 'fs';

type News = { no: number; title: string; href: string };
type Content = { [param: string]: News[] };

class Crawler {
	private rawHtml: string = '';
	private url: string = 'https://s.weibo.com/top/summary?cate=realtimehot';
	public isLoaded: boolean = false;
	public data: Content = {};
	constructor() {
		this.getRawData();
	}

	private getKey() {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		const day = now.getDate();
		const hour = now.getHours();
		const min = now.getMinutes();
		const second = now.getSeconds();

		return `${year}-${month}-${day} ${hour}:${min}:${second}`;
	}

	private getRawData() {
		superagent.get(this.url).then((res) => {
			this.rawHtml = res.text;
			const news = this.getHtml(this.rawHtml);
			const key = this.getKey();
			this.data[key] = news;
			this.isLoaded = true;
			this.exportData(this.data);
		});
	}

	private getHtml(content: string) {
		const $ = cheerio.load(content);
		const list = $('#pl_top_realtimehot > table > tbody > tr');
		let ret: News[] = [];
		list.map((index, item) => {
			const link = $(item).find('.td-02 > a').eq(0);
			ret.push({ no: index, title: link.text(), href: 'https://s.weibo.com/' + link.attr('href') || '' });
		});
		return ret;
	}

	private exportData(data: Content) {
		const filePath = path.resolve(__dirname, '../output/hot-search.json');
		if (fs.existsSync(filePath)) {
			let content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
			content = data;
			console.log(content);
			fs.writeFileSync(filePath, JSON.stringify(content));
		} else {
			fs.writeFileSync(filePath, JSON.stringify(data));
		}
	}
}

const crawler = new Crawler();
const timer = setInterval(() => {
	if (crawler.isLoaded) {
		console.log(crawler.data);
		clearInterval(timer);
	}
}, 1000);
