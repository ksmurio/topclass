import sequelize from '../config/db.js';
import User from './user.js';
import Club from './club.js';
import { initAssociations } from './associations.js';

initAssociations();

const db = {
  User,
  Club,
  sequelize
};

console.log('Modelos e associações carregados!');

export default db;
export { User, Club, sequelize };
