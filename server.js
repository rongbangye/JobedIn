const express = require("express");
const routes = require("./controllers/index");
const sequelize = require("./config/connection");
const path = require("path");
const exphbs = require("express-handlebars");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const hbs = exphbs.create({ helpers });

// const hbs = exphbs.create({});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// turn on routes
app.use(routes);

// app.get("/jobs", async (req, res) => {

//   const apiURL = `http://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}&results_per_page=10&what=node%20developer&where=usa&content-type=application/json`;

//   const fetch_response = await fetch(apiURL);
//   const json = await fetch_response.json();
//   console.log(json);
//   response.json(json);
// });

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
