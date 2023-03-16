module.exports = (sequelize, Sequelize) => {
    const Ingredient = sequelize.define("ingredient", {
      name: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      unit: {
        type: Sequelize.STRING
      }
    });  

    Ingredient.associate = function(models) {      
      Ingredient.belongsTo(models.dish, {
        onDelete: "CASCADE",
        foreignKey: 'dishId',
        as: 'dishes',
      })
    }

    return Ingredient;
  };