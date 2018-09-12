import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import jsend from 'jsend';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import userRoutes from './routes/userRoutes';
import articleRoute from './routes/articleRoutes';
import passportSetup from './config/passportSetup';
import authRoutes from './routes/authRoutes';

dotenv.config();
const app = express();
const urlencoded = bodyParser.urlencoded({ extended: false });
const json = bodyParser.json();
const port = parseInt(process.env.PORT, 10) || 8000;

// USE CORS TO AVOID CROSS ORIGIN CONFLICT
app.use(cors());
app.use(jsend.middleware);

// USE SWAGGER DOCUMENTATION
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// USE JSEND MIDDLEWARE
app.use(jsend.middleware);

// ALLOW APP TO USE BODY-PARSER.
app.use(urlencoded);
app.use(json);
app.use(jsend.middleware);


app.use(passportSetup.initialize());

// Use user routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/users/auth', authRoutes);

app.get('/', (req, res) => res.status(200).jsend.success({
  message: 'Welcome to the sims program'
}));
app.use('/api/v1/articles', articleRoute);


app.listen(port, () => console.log(`server is running on port ${port}`));

export default app;
