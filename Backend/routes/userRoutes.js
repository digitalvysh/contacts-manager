const express = require('express');
const router = express.Router();
const user = require("../model/user");
const {genHash, comparePassword,genToken} = require("../utils")

router.get("/api/v1/user", async function(req,res){
    try{
        const users = await user.find();
        res.send(users)
    }catch(e){
        console.log(e)
        res.status(500).send("internal server error")
    }
})

router.post("/api/v1/user",async function(req,res){
    try{
        const createuser = await user.create(req.body);
        res.send(createuser)
    }catch(e){
        console.log(e);
        res.status(500).send("internal server error")
    }
})

router.post('/api/v1/user/signup', async function(req, res) {
    try {
        const { email,password,confirmpassword } = req.body;
        console.log(req.body)
        const isuserExists = await user.findOne({ email });
        if (isuserExists) {
            const error = new Error('User Already Registered!');
            error.statusCode = 400;
            throw error;
        }
        const passwordHash = await genHash(password);
        await user.create({ email , password:passwordHash , confirmpassword:passwordHash });
        if(confirmpassword!=password){
            error = new Error("Password did not match");
            throw error;
        }
        res.send({ message: 'Signup Successful' });
    } catch(e) {
        console.log(e);
        res.status(e.statusCode || 500).send({
            error: e.message
        })
    }
});


router.post('/api/v1/user/login', async function(req, res) {
    try {
        const { email, password } = req.body;
        console.log(email)
        console.log(password)
        const isuserExists = await user.findOne({ email });
        if (!isuserExists) {
            const error = new Error('User Not Found!');
            error.statusCode = 404;
            throw error;
        }
        const match = await comparePassword(password,isuserExists.password)
        console.log(match)
        if (!match){
            const error = new Error("invalid password");
            error.statusCode = 404;
            throw error;
        }
        console.log(isuserExists)
        res.send({ token: genToken(isuserExists) });
    } catch (e) {
        console.log(e);
        res.status(e.statusCode || 500).send({
            error: e.message
        })
    }
})

module.exports = router;