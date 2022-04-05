const express=require('express');
const jwt=require('jsonwebtoken');
const User=require('../models/Users');
const bcrypt=require('bcryptjs');
const fetchuser=require('../middleware/fetchuser')
const router=express.Router();
const{body,validationResult}=require("express-validator");
router.post('/createuser',[
    body('name',"enter valid name").isLength({min:5}),
    body('email','enter valid email').isEmail(),
    body('password','provide a password').exists()
],async(req,res)=>{
   
    let success=false;
    const salt=await bcrypt.genSalt(10);
    const seqpassword=await bcrypt.hash(req.body.password,salt);
    const user1=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:seqpassword
    });
    try {
        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            res.status(400).json({errors:errors.array()});
        }
        else{
            console.log(user1);
            user1.save();
        }
        const data={
            id:user1.id
        }
        const authtoken=await jwt.sign(data,"chirag");
        success=true;
        res.json({success,authtoken});
    } catch (error) {
        console.log(error.message);
        
    }

});
router.post('/login',[
    body('email',"enter a valid email address").isEmail(),
    body('password',"should not be left blank").exists()
  ],async(req,res)=>{
    let success=false;
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  const{email,password}=req.body;
  console.log(email);
  try {
    let user1= await User.findOne({email});
    // user1.then((data)=>{
    //   console.log("data:",data);
    // }).catch((error)=>{
    //   console.log("error",error);
    // })
    if(!user1){
      res.status(400).json({error:"Incorrect credentials"});
    }
   
    console.log("123",user1.password);
    const comparepassword=await bcrypt.compare(password,user1.password);
    if(!comparepassword)
    {
      res.status(400).json({error:"Incorrect credentials"});
    }
    const data={
      id:user1.id
    }
    success=true;
    const authtoken=await jwt.sign(data,"chirag");
    
    res.json({success,authtoken});
  } catch (error) {
    console.log(error.stack);
    console.log("catcherrro",error.message);
    res.status(500).send("some error occured");s
    
  }
  });
  router.get('/allowuser',fetchuser,async(req,res)=>{
      try {
          const userid= req.user.id;
          const user1=await User.findById(userid).select("-password");
          res.send(user1);
      } catch (error) {
          console.log(error.message);
          res.status(401).send("authorization required");
      }
  })
module.exports=router;