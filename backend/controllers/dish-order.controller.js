const db = require("../models");
const DishOrder = db.dishorder;
const Sequelize = require('sequelize');
const Op = db.sequelize.Op;


// CREATE DISHORDER
exports.create = (req, res) => {
    // if (!req.body.name) {
    //     res.status(400).send({
    //         message: "Content cannot be empty"
    //     });
    // }


    const dishOrder = {
        dishAmount: req.body.dishAmount,
        dishId: req.body.dishId,
        orderId: req.body.orderId
    }

    console.log(dishOrder);

    DishOrder.create(dishOrder).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the dishOrder"
        });
    });
}


// GET ALL DISHES

exports.findAll = (req, res) => {
    DishOrder.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving all Dishs"
        })
    })
};


// GET ONE DISHORDER
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id)

    DishOrder.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find DishOrder with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving DishOrder with id=" + id
            });
        });
};


// UPDATE DISHORDER

exports.update = (req, res) => {

    const id = req.params.id;
    // if (!req.body.id) {
    //     res.status(400).send({
    //         message: "Content cannot be empty!"
    //     });
    // }

    // Create a DishOrder
    const dishOrder = {
        dishAmount: req.body.dishAmount,
        dishId: req.body.dishId,
        orderId: req.body.orderId
    }
        DishOrder.findByPk(id)
            .then(data => {
                if (data) {
                    DishOrder.update(dishOrder, {
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({
                                    message: "DishOrder was updated successfully."
                                });
                            } else {
                                res.send({
                                    message: `Cannot update DishOrder with id=${id}. Maybe DishOrder was not found!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error updating DishOrder with id=" + id
                            });
                        });
                } else {
                    res.status(404).send({
                        message: `Cannot find DishOrder with id=${id}.`
                    });
                }
            })}


// DELETE DISHORDER
exports.delete = (req, res) => {
    const id = req.params.id;

    DishOrder.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "DishOrder was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete DishOrder with id=${id}. Maybe DishOrder was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete DishOrder with id=" + id
            });
        });
};