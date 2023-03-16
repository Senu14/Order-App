const db = require("../models");
const Ingredient = db.ingredient;
const Sequelize = require('sequelize');
const Op = db.sequelize.Op;

// CREATE INGREDIENT

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    const ingredient = {
        name: req.body.name,
        dishId: req.body.dishId,
        amount: req.body.amount,
        unit: req.body.unit
    }

    console.log(ingredient);

    Ingredient.create(ingredient).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the ingredient"
        });
    });
}



// GET ALL INGREDIENTS

exports.findAll = (req, res) => {
    Ingredient.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving all ingredients"
        });
    });
}

// GET ONE INGREDIENT

exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id)

    Ingredient.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find ingredient with id=${id}`

                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving ingredient with id=" + id
            });
        });
}


// UPDATE INGREDIENT

exports.update = (req, res) => {
    const id = req.params.id;
    var image = '';
    if (!req.body.name) {
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    const ingredient = {
        name: req.body.name,
        dishId: req.body.dishId,
        amount: req.body.amount,
        unit: req.body.unit
    }

if (ingredient.filename == "") {
  Ingredient.findByPk(id)
    .then(data => {
      if (data) {
        image = data;
        ingredient.filename = image.filename;
        Ingredient.update(dish, {
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
  Ingredient.update(ingredient, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Ingredient was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ingredient with id=${id}. Maybe Dish was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating ingredient with id=" + id
      });
    });
}
}

// FIND BY DISH ID

exports.findAllByDishId = (req, res) => {
    const id = req.params.id;
    console.log(req.params.id)
  
    Ingredient.findAll({ where: { dishId: id } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving dishes."
        });
      });
  };



// DELETE

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Ingredient.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Ingredient was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete ingredient with id=${id}. Maybe Dish was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete ingredient with id=" + id
        });
      });
  };

