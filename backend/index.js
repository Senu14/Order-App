require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

var path = require('path');

 
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));
 
var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
 
db = require("./models");

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync(); 

// In development, you may need to drop existing tables and re-sync database
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.use(function (req, res, next) {
  var token = req.headers['authorization'];
  if (!token) return next();

  if(req.headers.authorization.indexOf('Basic ') === 0){
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    req.body.username = username;
    req.body.password = password;

    return next();
  }

  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; 
      req.token = token;
      next();
    }
  });
});

db.order = require("./models/order.model")(sequelize, Sequelize);
db.dish = require("./models/dish.model")(sequelize, Sequelize);

db.dishorders = require("./models/dish-order.model")(sequelize, Sequelize);

db.order.belongsToMany(db.dish, {
  through: db.dishorders
})

db.dish.belongsToMany(db.order, {
  through: db.dishorders
})



require("./routes/user.routes")(app);
require("./routes/ingredient.routes")(app);
require("./routes/dish.routes")(app);
require("./routes/order.routes")(app);
require("./routes/dish-order.routes")(app);

app.listen(port, () => {
  console.log('Server started on: ' + port);
});