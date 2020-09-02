import { Router, Request, Response } from 'express';

// for dealing with poor type definition files
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <form method="POST">
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

router.post('/login', (req: RequestWithBody, res: Response) => {
  // to parse the submitted form content we use 'body-parser'
  // now ew'll have access to 'req.body' which will contain the form content
  const { email, password } = req.body;

  if (email) {
    res.send(email.toUpperCase());
  } else {
    res.send('You must provide an email');
  }
});

export { router };
