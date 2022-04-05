const jwt=require('jsonwebtoken');
const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token)
    {
        res.status(401).send("authorization required");
    }
    try {
        const data=jwt.verify(token,"chirag");
req.user=data;
next();
        
    } catch (error) {
        console.log(error.message);
        res.status(401).send("authorization required");
        
    }
}
module.exports=fetchuser;