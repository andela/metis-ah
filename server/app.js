import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

import users from './controllers/user';
import middleware from './middleware/middleware';

const { signUp } = users;

const app = express();
const urlencoded = bodyParser.urlencoded({ extended: false });
const json = bodyParser.json();
const port = parseInt(process.env.PORT, 10) || 8000;

// USE CORS TO AVOID CROSS ORIGIN CONFLICT
app.use(cors());

// USE SWAGGER DOCUMENTATION
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ALLOW APP TO USE BODY-PARSER.
app.use(urlencoded);
app.use(json);

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to the sims program'
}));
app.post('/users/auth/signup', middleware.validateSignUp, signUp);

app.listen(port, () => console.log(`server is running on port ${port}`));

export default app;
