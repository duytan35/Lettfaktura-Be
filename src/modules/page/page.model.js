import { DataTypes } from "sequelize";
import { sequelize } from "../../config/index.js";

const Page = sequelize.define(
  "Page",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    tableName: "pages",
    timestamps: true,
    underscored: true,
  }
);

export default Page;