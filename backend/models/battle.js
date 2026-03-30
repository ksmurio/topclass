import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Battle = sequelize.define(
  "Battle",
  {
    id: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    club_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    creator_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("scheduled", "ongoing", "finished"),
      allowNull: true,
      defaultValue: "scheduled",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  {
    tableName: "battles",
    timestamps: false,
  },
);

export default Battle;
