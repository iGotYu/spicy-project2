// const express = require('express');
// const session = require("express-session");
// const exphbs = require("express-handlebars");
// const sequelize = require("./config/connection")
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// //const User = require("./models/User")
// require("dotenv").config();
// const routes = require("./controllers");
// const app = express();
// const PORT = process.env.PORT || 3001;
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"))
// const hbs = exphbs.create({})
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
// app.use(session(
//   {
//     secret:process.env.SESSION_SECRET,
//     resave:false,
//     cookie:{
//       maxAge:1000*60*60*2
//     },
//     saveUninitialized:true,
//     store: new SequelizeStore({
//       db: sequelize,
//     }),
//   }
// ))
// app.use(routes);
// // turn on connection to db and server
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });