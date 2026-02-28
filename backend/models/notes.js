import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Note = sequelize.define("Note", {
  id: {
    type: DataTypes.CHAR(36),
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.CHAR(36),
    allowNull: true
  },
  club_id: {
    type: DataTypes.CHAR(36),
    allowNull: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'notes',
  timestamps: false,
  underscored: true
});

export default Note;