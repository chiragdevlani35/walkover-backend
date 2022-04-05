const express=require('express');
const mongoose=require('mongoose');
const {Schema}=mongoose;
const urlschema=new Schema({
    longurl:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        default:0
    },
    urlcode:{
        type:String,
        default:""
    },
    shorturl:{
        type:String,
        default:""
    },
    name:{
        type:String,
        default:""
    },
    date:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }


})
module.exports=mongoose.model('url',urlschema);