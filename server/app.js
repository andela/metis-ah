import bodyParser from 'body-parser';
import express from 'express';
import expressSession from 'express-session';
import cors from 'cors';
import jsend from 'jsend';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import userRoutes from './routes/userRoutes';
import articleRoutes from './routes/articleRoutes';
import passportSetup from './config/passportSetup';
import authRoutes from './routes/authRoutes';
import caseRoutes from './routes/caseRoutes';
import tagRoute from './routes/tagRoutes';
import roleRoutes from './routes/roleRoutes';
import authorRoutes from './routes/authorRoutes';
import categoryRoute from './routes/categoryRoutes';
import notifyRoutes from './routes/notificationRoutes';

dotenv.config();
const app = express();
const urlencoded = bodyParser.urlencoded({
  extended: false
});
const json = bodyParser.json();
const port = parseInt(process.env.PORT, 10) || 8000;

// USE CORS TO AVOID CROSS ORIGIN CONFLICT
app.use(cors());

// USE SWAGGER DOCUMENTATION
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(jsend.middleware);
app.use(urlencoded);
app.use(json);
app.use(jsend.middleware);

app.use(expressSession({
  secret: process.env.SECRET
}));
app.use(passportSetup.initialize());
app.use(passportSetup.session());

// Use user routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/notifications', notifyRoutes);
app.use('/api/v1/users/auth', authRoutes);
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/cases', caseRoutes);
app.use('/api/v1/tags', tagRoute);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/authors', authorRoutes);
app.use('/api/v1/categories', categoryRoute);

app.get('/', (req, res) => res.status(200).jsend.success({
  message: 'Welcome to the sims program'
}));

app.listen(port, () => console.log(`server is running on port ${port}`));

export default app;
