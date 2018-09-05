import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import jsend from 'jsend';
import swaggerDocument from '../swagger.json';
import userRoutes from './routes/userRoutes';

const app = express();
const urlencoded = bodyParser.urlencoded({ extended: false });
const json = bodyParser.json();
const port = parseInt(process.env.PORT, 10) || 8000;

// USE CORS TO AVOID CROSS ORIGIN CONFLICT
app.use(cors());

// USE SWAGGER DOCUMENTATION
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// USE JSEND MIDDLEWARE
app.use(jsend.middleware);

// ALLOW APP TO USE BODY-PARSER.
app.use(urlencoded);
app.use(json);

app.use('/api/v1/users', userRoutes);

app.get('/', (req, res) => res.status(200).jsend.success({
  message: 'Welcome to the sims program'
}));

app.listen(port, () => console.log(`server is running on port ${port}`));

export default app;
