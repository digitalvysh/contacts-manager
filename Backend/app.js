const express = require("express");
const app = express();
const mongoose = require("mongoose")
const user= require("./model/user")
const contact = require("./model/contact")
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes")

const url = "mongodb://127.0.0.1:27017/contacts-manager";
async function connectDB() {
    try {
        await mongoose.connect(url);
        console.log("conected to database")
    } catch (e) {
        console.log(e)
    }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

async function main() {
    await connectDB();
    app.get("/", function (req, res) {
        res.send("Contact manager")
    })

    app.use('/',userRoutes);

    app.listen(7000, function () {
        console.log("server start at http://localhost:7000")
    });
}
main()