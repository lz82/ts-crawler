import superagent from 'superagent';
interface IParser {
	url: string;
	parse: (content: string) => void;
}

export default class Crawler {
	constructor(private parser: IParser) {}

	public parseData() {
		superagent.get(this.parser.url).then((res: superagent.Response) => {
			this.parser.parse(res.text);
		});
	}
}
