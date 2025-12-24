import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.js';

const Club = sequelize.define("Club", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  club_type: {
    type: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'),
    allowNull: false
  },
  creator_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  club_uuid: {
    type: DataTypes.STRING(36),
    unique: true,
    defaultValue: DataTypes.UUIDV4 
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  is_private: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'clubs',
  timestamps: false,
  underscored: true
});

// Associações
Club.belongsTo(User, { foreignKey: 'creator_id', as: 'creator' }); //As associações declaram o relacionamento entre modelos, mas só são usadas quando você pede com include.
User.hasMany(Club, { foreignKey: 'creator_id', as: 'clubs' });

export default Club;