module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const auth = require("../controllers/auth.controller.js");
  
    var upload = require('../multer/upload');

    var router = require("express").Router();
  
    router.post("/",upload.single('file'), users.create);
  
    router.get("/", users.findAll);
    
    router.get("/:id", users.findOne);
  
    router.put("/:id",upload.single('file'), auth.isAuthenticated, users.update);
  
    router.post("/signin",upload.single('file'), auth.signin);
  
    router.delete("/:id", users.delete);
  
    // router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };