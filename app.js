const express = require("express");
const exhbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;




//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//static Files
app.use(express.static("public"));

//Template Engine
const handlebars = exhbs.create({extname:".hbs"});
app.engine("hbs",handlebars.engine);
app.set("view engine","hbs");

const routes = require("./server/routes/student");
app.use('/',routes);

//Listen Port
app.listen(port,()=>{
    console.log("Listening Port : "+ port);
})
