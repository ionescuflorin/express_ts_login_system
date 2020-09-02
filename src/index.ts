// THIS IS THE MINIMUM TS VERSION
import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();

// urlencoded - will parse the form response
app.use(bodyParser.urlencoded({ extended: true }));
// that string it will encrypt the session
app.use(cookieSession({ keys: ['asdf'] }));
app.use(router);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
