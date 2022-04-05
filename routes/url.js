const express=require('express');
const router=express.Router();
const fetchuser=require('../middleware/fetchuser')
const validurl=require('valid-url');
const shortid=require('shortid');

const Url=require('../models/Url');
const { findByIdAndUpdate, findOne,findById } = require('../models/Url');
const baseurl="http://localhost:5000";

router.delete('/deleteurl/:id',fetchuser,async(req,res)=>{
    try {
        let quoto=await Url.findById(req.params.id);
        if(!quoto){
            res.status(404).send("not found");
        }

        if(quoto.user.toString()!==req.user.id)
        {
            res.status(401).send("not authorized");
        }
        quoto=await Url.findByIdAndDelete(req.params.id);
        res.send(quoto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
})
router.get('/fetchurls',fetchuser,async(req,res)=>{

    try {
        const urlok=await Url.find({user:req.user.id});
        res.json(urlok);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('error');
        
    }
    
})
router.post('/workonit',fetchuser,async(req,res)=>{
    
const {longurl,name}=req.body;

if(!validurl.isUri(baseurl))
{
    return res.status(401).json("invalid base url");

}
const urlcode=shortid.generate();
if(validurl.isUri(longurl))
{
    try {
        let url=await Url.findOne({longurl});
        if(url)
        {
            res.json(url);

        }

        else{
            const shorturl=baseurl+'/'+req.user.id+'/'+urlcode;
            url=new Url({
                name,
                urlcode,
                longurl,
                shorturl,
                user:req.user.id
                
            });
           
            await url.save();
            res.json(url);

        }
        
    } catch (error) {
       
        console.error(error);
        res.status(500).json("internal server error");
        
    }
}
else{
    res.status(401).send("invalid url");
}


})
router.get('/:id/:code',async(req,res)=>{
    try {
        let url={};
        const urlok=await Url.find({user:req.params.id});
       for (let index = 0; index < urlok.length; index++) {
           const element = urlok[index];
            if(element.urlcode===req.params.code)
            {
                url=element;
            }
       }
        
                console.log(url);

        if(url)
        {
            
const newurl={};
           let x=url.count+1;
        newurl.count=x;
        await Url.findByIdAndUpdate(url.id,{$set:newurl},{new:true});
            return res.redirect(url.longurl);
        }
        else{
            res.status(401).send("not valid url");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("internal server error");
    }
})

module.exports=router;