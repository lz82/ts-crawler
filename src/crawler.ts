import superagent from 'superagent';
import cheerio from 'cheerio';
type News = { no: number; title: string; href: string };
class Crawler {
	private rawHtml: string = '';
	private url: string = 'https://s.weibo.com/top/summary?cate=realtimehot';
	constructor() {}

	async getRawData() {
		try {
			const rawData = await superagent.get(this.url);
			return rawData.text;
		} catch (err) {}
	}

	getHtml(content: string) {
		const $ = cheerio.load(content);
		const list = $('#pl_top_realtimehot > table > tbody > tr');
		let ret: News[] = [];
		list.map((index, item) => {
			const link = $(item).find('.td-02 > a').eq(0);
			ret.push({ no: index, title: link.text(), href: 'https://s.weibo.com/' + link.attr('href') || '' });
		});
		return ret;
	}
}

const crawler = new Crawler();
crawler.getRawData().then((res) => {
	const ret = crawler.getHtml(res || '');
	console.log(ret);
});
