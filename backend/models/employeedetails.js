'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employeedetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employeedetails.init({
    name: DataTypes.STRING,
    employeeid: DataTypes.STRING,
    department: DataTypes.STRING,
    designation: DataTypes.STRING,
    type: DataTypes.STRING,
    project: DataTypes.STRING,
    status: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'employeedetails',
  });
  return employeedetails;
};