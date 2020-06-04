module.exports = (sequelize, DataType) => {
  const Recipes = sequelize.define('Recipes', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    sourceName: {
      type: DataType.STRING,
      allowNull: false,
    },
    readyInMinutes: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    healthScore: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    summary: {
      type: DataType.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: model => {
        Recipes.belongsTo(model.User);
      },
    },
  });

  Recipes.associate = model => {
    Recipes.belongsTo(model.Users);
  };

  return Recipes;
};
