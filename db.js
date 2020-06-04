import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
let db = null;
let sequelize = null;

module.exports = app => {
  if (!db) {
    const { config } = app.libs;
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params,
    );

    db = {
      sequelize,
      Sequelize,
      models: {},
    };

    const dir = path.join(__dirname, 'models');
    fs.readdirSync(dir).forEach(file => {
      const modelDir = path.join(dir, file);
      const model = sequelize.import(modelDir);
      db.models[model.name] = model;
    });

    Object.keys(db.models).forEach(key => {
      if (db.models[key].hasOwnProperty('associate')) {
        db.models[key].associate(db.models);
      }
    });
  }

  return db;
};
