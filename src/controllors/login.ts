import { Request, Response } from 'express';
import { controller, get, post } from '../decorators';

import { getSuccess } from '../utils/result';

interface BodyRequest extends Request {
	body: {
		[key: string]: any;
	};
}

@controller
class LoginController {
	@get('/')
	home(req: Request, res: Response) {
		res.send('crawler homepage');
	}

	@get('/login')
	login(req: Request, res: Response) {
		console.log(req.session?.isLogin);
		res.send(`<html>
      <body>
        <form method="post" action="/checklogin">
          <label>用户名</label>
          <input name="username" />
          <button type="submit">提交</button>
        </form>
      </body>
    </html>`);
	}

	@get('/logout')
	logout(req: BodyRequest, res: Response) {
		console.log(req.body);
		if (req.session) {
			req.session.isLogin = null;
		}
		res.send('logout...');
	}

	@post('/checkLogin')
	checkLogin(req: BodyRequest, res: Response) {
		const { username } = req.body;
		if (username === 'lz') {
			if (req.session) {
				req.session.isLogin = true;
			}
		}
		res.json(getSuccess(req.session?.isLogin));
	}
}

export default LoginController;
