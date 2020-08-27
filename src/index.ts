import Crawler from './crawler';

import WeiboHotSearchParser from './parser/hot-search';

import path from 'path';

const outputPath = path.resolve(__dirname, '../output/hot-search.json');
const hsParser = WeiboHotSearchParser.getInstance(outputPath);

const crawler = new Crawler(hsParser);

crawler.parseData();
