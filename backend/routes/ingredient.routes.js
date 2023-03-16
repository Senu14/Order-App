module.exports = app => {
    const ingredients = require("../controllers/ingredient.controller");
  
    var router = require("express").Router();
  
    router.post("/", ingredients.create);

    router.get("/", ingredients.findAll);

    router.get("/dish/:id", ingredients.findAllByDishId)
  
    router.get("/:id", ingredients.findOne);
  
    router.put("/:id", ingredients.update);
  
    router.delete("/:id", ingredients.delete);
  
    app.use("/api/ingredients", router);
  }