import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
	res.send('crawler');
});

router.get('/login', (req: Request, res: Response) => {
	res.send(`<html>
    <body>
      <form>
        <label>用户名</label>
        <input />
      </form>
    </body>
  </html>`);
});

router.get('/logout', (req: Request, res: Response) => {
	res.send('logout...');
});

export default router;
