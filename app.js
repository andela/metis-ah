import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const urlencoded = bodyParser.urlencoded({ extended: false });
const json = bodyParser.json();
const port = parseInt(process.env.PORT, 10) || 8000;

app.use(urlencoded);
app.use(json);
app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to the sims program'
}));

app.listen(port, () => console.log('yo mehn started!'));

export default app;
