import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const SubjectGrade = sequelize.define('SubjectGrade', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  user_id: {
    type: DataTypes.CHAR(36),
    allowNull: false
  },
  club_id: {
    type: DataTypes.CHAR(36),
    allowNull: true
  },
  subject_id: {
    type: DataTypes.CHAR(36),
    allowNull: true
  },
  grade: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: true,
    validate: {
      min: 0,
      max: 20
    }
  },
  graded_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'subject_grades',
  timestamps: false
});

export default SubjectGrade;