import { Sequelize } from "sequelize";

const db = new Sequelize('adopt_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+07:00'
});

export default db;
