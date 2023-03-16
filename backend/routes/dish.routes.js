module.exports = app => {
    const dishes = require("../controllers/dish.controller");
  
    var router = require("express").Router();
  
    router.post("/", dishes.create);

    router.get("/", dishes.findAll);
  
    router.get("/:id", dishes.findOne);
  
    router.put("/:id", dishes.update);
  
    router.delete("/:id", dishes.delete);
  
    app.use("/api/dishes", router);
  }