const express = require("express")
const app = express()
const port = 5000
const cors = require("cors")
//const auther = require("./routes/auther")
//const bodyparser = require("body-parser")
const User = require("./models/User.js");
const mongoose = require("mongoose")
//const url = "mongodb+srv://managers:12345@cluster0.vmsqp.mongodb.net/?retryWrites=true&w=majority";
const url = "mongodb://localhost:27017/total-contacts";

async function connectDB() {
    try {
        await mongoose.connect(url);
        console.log("conected to database")
    } catch (e) {
        console.log(e)
    }
}

async function main() {
    await connectDB();
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    //route
    app.get("/", function (req, res) {
        res.send("hello world")

    });


    app.listen(port, function () {
        console.log("server start at", port)
    });
}
main()