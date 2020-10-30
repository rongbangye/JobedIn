const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');


//server and port setup
const app = express();
const PORT = process.env.PORT || 3001;




// turn on connection to db and server
sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });