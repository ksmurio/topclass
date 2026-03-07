import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Subject = sequelize.define('Subject', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  year: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false
  }
}, {
  tableName: 'subjects',
  timestamps: false
});

export default Subject;