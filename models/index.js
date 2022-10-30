const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tdf extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tdf.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
     stage: DataTypes.STRING,
     year: DataTypes.INTEGER,
     distance: DataTypes.INTEGER,
     origin: DataTypes.STRING,
     destination: DataTypes.STRING,
     type: DataTypes.INTEGER,
     winner: DataTypes.STRING,
     winner_country: DataTypes.STRING,

    },
    {
      // options
      sequelize,
      modelName: 'Tdf',
      tableName: 'tdf',
      underscore: true,
      createdAt: 'date_created',
      timestamps: false
    },
  );
  return Tdf;
};
