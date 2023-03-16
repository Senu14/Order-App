module.exports = app => {
    const orders = require("../controllers/order.controller");
  
    var router = require("express").Router();
  
    router.post("/", orders.create);

    router.get("/", orders.findAll);

    // router.get("/dish/:id", orders.findAllByDishId)
  
    router.get("/:id", orders.findOne);
  
    router.put("/:id", orders.update);
  
    router.delete("/:id", orders.delete);
  
    app.use("/api/orders", router);
  }