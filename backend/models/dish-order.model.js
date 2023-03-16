module.exports = (sequelize, Sequelize) => {
    const DishOrder = sequelize.define("dishorder", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
      dishAmount: {
        type: Sequelize.STRING
      }
    })
    DishOrder.associate = function(models) {      
      DishOrder.belongsTo(models.dish, {
        onDelete: "CASCADE",
        foreignKey: 'dishId',
        as: 'dishes',
      }),
      DishOrder.belongsTo(models.order, {
        onDelete: "CASCADE",
        foreignKey: 'orderId',
        as: 'orders',
      })
    }

    return DishOrder;
  };