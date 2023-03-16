module.exports = app => {
    const dishorders = require("../controllers/dish-order.controller");
  
    var router = require("express").Router();
  
    router.post("/", dishorders.create);

    router.get("/", dishorders.findAll);
  
    router.get("/:id", dishorders.findOne);
  
    router.put("/:id", dishorders.update);
  
    router.delete("/:id", dishorders.delete);
  
    app.use("/api/dish-orders", router);
  }