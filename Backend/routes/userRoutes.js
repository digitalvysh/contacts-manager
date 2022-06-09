const express = require('express');
const router = express.Router();
const user = require("../model/user");
const {genHash, comparePassword,genToken,verifyToken} = require("../utils")

router.get("/api/v1/user", async function(req,res){
    try{
        const users = await user.find();
        res.send(users)
    }  catch(e){
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
            console.log("isuserExists")
            return res.status(400).send({error:"User already registered!"})
        }
        if (!confirmpassword){
            return res.status(400).send({error:"confirm the password!"})
        }
        if(confirmpassword!=password){
            error = new Error("Password did not match");
            throw error;
        }
        const passwordHash = await genHash(password);
        await user.create({ email , password:passwordHash , confirmpassword:passwordHash });
        res.status(200).send({ message: 'Signup Successful' });
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
            // const error = new Error('User Not Found!');
            // error.statusCode = 404;
            // throw error;
            return res.status(400).send({error:"User not found!"})
        }
        const match = await comparePassword(password,isuserExists.password)
        console.log(match)
        if (!match){
            const error = new Error("invalid password");
            error.statusCode = 404;
            throw error;
        }
        console.log(isuserExists)
        res.send({token : genToken(isuserExists)});
    } catch (e) {
        console.log(e);
        res.status(e.statusCode || 500).send({
            error: e.message
        })
    }
})

// router.use('/api/v1/*', async function(req, res, next) {
//     // console.log("I am in the middleware", req.headers);
//     try {
//         const authHeader = req.headers['authorization'];
//         console.log(req.headers)
//         console.log(req)
//         if (!authHeader) {
//             return res.status(401).send({
//                 error: 'User not authorized!'
//             });
//         }
//         else {
//             const token = authHeader.split('Bearer ')[1];
//             const decoded = await verifyToken(token);
//             // req.userEmail = decoded.email;
//             req.user = decoded.data.id         
//             console.log(decoded)
//             console.log("req : ",req)
//             console.log(req.user)
//         }
//         next();
//     } catch(e) {
//         console.log(e);
//         return res.status(400).send({
//             error: e.message
//         })
//     }
// })

module.exports = router;