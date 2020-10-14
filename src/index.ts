import express from 'express';
import bodyParser from 'body-parser';

import router from './router';
// 引入所有的controllor
// 目的是让decorator生效
import './controllors';
import cookieSession from 'cookie-session';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
	cookieSession({
		name: 'ts-crawler',
		keys: ['authorization'],
	})
);
app.use(router);

app.listen(6066, () => {
	console.log('server is running at 6066...');
});
