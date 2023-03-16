const db = require ("../models");
const Dish = db.dish;
const Sequelize = require('sequelize');
const Op = db.sequelize.Op;


// CREATE DISH
exports.create = (req, res) => {
    // if (!req.body.name) {
    //     res.status(400).send({
    //         message: "Content cannot be empty"
    //     });
    // }


const dish = { 
    name: req.body.name
}

console.log(dish);

Dish.create(dish).then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the dish"
    });
});
}


// GET ALL DISHES

exports.findAll = (req, res) => {
    Dish.findAll().then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving all Dishs"
      })
    })
  };
  

// GET ONE DISH
  exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id)
  
    Dish.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Dish with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Dish with id=" + id
        });
      });
  };


// UPDATE DISH

  exports.update = (req, res) => {

    const id = req.params.id;
    var image = '';
    if (!req.body.name) {
      res.status(400).send({
        message: "Content cannot be empty!"
      });
    }
  
    // Create a Dish
    const dish = {
      name: req.body.name
    }
    if (dish.filename == "") {
      Dish.findByPk(id)
        .then(data => {
          if (data) {
            image = data;
            dish.filename = image.filename;
            Dish.update(dish, {
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
      Dish.update(dish, {
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
    }
  };


// DELETE DISH
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Dish.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Dish was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Dish with id=${id}. Maybe Dish was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Dish with id=" + id
        });
      });
  };