module.exports = (sequelize, Sequelize) => {
    const Dish = sequelize.define("dish", {
      name: {
        type: Sequelize.STRING
      }
    });  
    return Dish;
  };