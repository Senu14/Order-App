module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      days: {
        type: Sequelize.INTEGER
      }
    });
    return Order;
  };