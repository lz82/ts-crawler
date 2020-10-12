import express from 'express';
import loginRouter from './router/login';

const app = express();

app.use(loginRouter);

app.listen(6066, () => {
	console.log('server is running at 6066...');
});
