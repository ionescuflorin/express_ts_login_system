import { Router, Request, Response } from 'express';

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <form>
        <div>
            <label>Email</label>
            <input name="email" />
        </div>    
        <div>
            <label>Password</label>
            <input name="password" type="password" />
        </div>    
        <button>Submit</button>
    </form>
  `);
});

router.post('/login', (req: Request, res: Response) => {
  // to parse the submitted form content we use 'body-parser'
  // now ew'll have access to 'req.body' which will contain the form content
  const { email, password } = req.body;

  // TEST
  res.send(email+password)
});

export { router };
