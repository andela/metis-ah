import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dbConfig from '../config/config';

const basename = path.basename(module.filename);
const config = dbConfig[process.env.NODE_ENV];
const db = {};

<<<<<<< Updated upstream
const sequelize = new Sequelize(process.env[config.use_env_variable]);
=======
let sequelize;

if (
  process.env.NODE_ENV === 'production'
  || process.env.NODE_ENV === 'development'
  || process.env.NODE_ENV === 'test'
) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    dialectOptions: { ssl: { require: true } }
  });
} else {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
}
>>>>>>> Stashed changes

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0)
    && (file !== basename)
    && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
