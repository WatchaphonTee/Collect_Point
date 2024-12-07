const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/add",require("./apis/add_api"));
app.use("/shop",require("./apis/shop_api"));
app.use("/order",require("./apis/order_api"));
app.use("/show",require("./apis/show_api"));
app.use("/attendance",require("./apis/attendance_api"));
app.use('/images', express.static(path.join(__dirname, 'uploads', 'images')));

//server runs on port 8000
app.listen(8000,() => {
    console.log("Backend is running...");
})