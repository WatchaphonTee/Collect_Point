const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/add",require("./apis/add_api"));
app.use("/check",require("./apis/check_api"));
//server runs on port 8000
app.listen(8000,() => {
    console.log("Backend is running...");
})