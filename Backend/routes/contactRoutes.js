const express = require('express');
const { default: mongoose } = require('mongoose');
const contact = require('../model/contact');
const router = express.Router();

router.get('/api/v1/contacts',async function(req,res){
    try{
        const contacts = await contact.find();
        res.send({
            contacts
        })
    }catch(e){
        console.log(e);
        res.status(500).send({
            error : e.message
        })
    }
})

router.post('/api/v1/contacts',async function(req,res){
        // const {name, designation, company, industry, email, phonenumber, country ,postedby} = req.body;
        // if (!name || !designation || !company || !industry || !email || !phonenumber || !country ||!postedby){
        //     const error = new Error('Invalid Request');
        //     error.statusCode = 400;
        //     throw error;
        // }
        // 
        try{
            const addcontacts = await contact.create({...req.body, postedby:req.user});
            console.log(addcontacts);
            res.send(addcontacts);
        }
    catch(e){
        console.log(e)
        res.status(e.statusCode || 500).send({
            error:e.message || 'Internal server Error'
        })
    }
})

router.delete('/api/v1/contacts/:id', async function(req,res){
    try{
        await contact.deleteOne({_id: mongoose.Types.ObjectId(req.params.id)});
        console.log(req.body , req.params);
        res.send({});
    }catch(e){
        console.log(e);
        res.status(e.statusCode || 500).send({
            error: e.message || 'internal server error'
        })
    }
})

module.exports = router;