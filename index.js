const connecttomongo=require('./db');
const express=require('express');
const cors=require('cors');
const app=express();
const port=3000;
connecttomongo();
app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send("hello world");
})
app.use('/',require('./routes/url'));
app.use('/auth',require('./routes/auth'));
app.listen(port,()=>{
    console.log(`backend running on http://localhost:${port}`);
})
