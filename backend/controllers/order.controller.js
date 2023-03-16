const db = require("../models");
const Order = db.order;
const Sequelize = require('sequelize');
const Op = db.sequelize.Op;

// CREATE ORDER

exports.create = (req, res) => {
    if (!req.body.days) {
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    const order = {
        days: req.body.days 
        
    }

    console.log(order);

    Order.create(order).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the order"
        });
    });
}



// GET ALL ORDERS

exports.findAll = (req, res) => {
    Order.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving all orders"
        });
    });
}

// GET ONE ORDER

exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id)

    Order.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find order with id=${id}`

                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving order with id=" + id
            });
        });
}


// UPDATE ORDER

exports.update = (req, res) => {
    const id = req.params.id;
    var image = '';
    if (!req.body.days) {
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    const order = {
        days: req.body.days,
        
    }

if (order.filename == "") {
  Order.findByPk(id)
    .then(data => {
      if (data) {
        image = data;
        order.filename = image.filename;
        Order.update(dish, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Dish was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Dish with id=${id}. Maybe Dish was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Dish with id=" + id
            });
          });
      } else {
        res.status(404).send({
          message: `Cannot find Dish with id=${id}.`
        });
      }
    })
} else {
  Order.update(order, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Order was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update order with id=${id}. Maybe Dish was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating order with id=" + id
      });
    });
}
}


// DELETE

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Order.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Order was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete order with id=${id}. Maybe Dish was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete order with id=" + id
        });
      });
  };

