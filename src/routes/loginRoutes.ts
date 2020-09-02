import { Router, Request, Response, NextFunction } from 'express';

// for dealing with poor type definition files
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

// middleware for protected routes
function requireAuth(req: Request, res: Response, next: NextFunction): void {
  // has session and is loggedin
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not Permitted')
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

  if (email && password && email === 'hi@hi.com' && password === 'password') {
    // mark this person as logged in
    req.session = { loggedIn: true };

    // redirect them to the root route
    res.redirect('/');
  } else {
    res.send('Invalid email or password');
  }
});

router.get('/', (req: Request, res: Response) => {
  // req.session - checking login status
  // req.session && - type guard
  if (req.session && req.session.loggedIn) {
    res.send(`
            <div>
                <div>You are logged in</div>
                <a href="/logout">Logout</div>
            </div>
        `);
  } else {
    res.send(`
            <div>
                <div>You are not logged in</div>
                <a href="/login">Login</div>
            </div>
        `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  // logout
  req.session = null;
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send('Welcome to protected route, logged in user')
})

export { router };
