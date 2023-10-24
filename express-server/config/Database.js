import { Sequelize } from "sequelize";

const db = new Sequelize("authdb", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
});

export default db;
