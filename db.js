const mongoose=require("mongoose");
const uri="mongodb+srv://chirag:123@cluster0.91vzt.mongodb.net/walkover?retryWrites=true&w=majority";
// const connecttomongo=async()=>{
//     try {
//         await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true},()=>{
//             console.log("connected to mongodb successfully");
//         })
//     } catch (error) {
//         console.log(error);
//     }
 
// }
// mongoose.connect('mongodb://username:password@host:port/database?options...');
// const uri1="mongodb://chiragdevlani20:chirag@123@cluster0.91vzt.mongodb.net/walkover?retryWrites=true&w=majority"
const connecttomongo=()=>{
    mongoose.connect(uri, {

        useNewUrlParser: true
    
    }).then(() => {
    
        console.log("Successfully connected to the database");    
    
    }).catch(err => {
    
        console.log('Could not connect to the database. Exiting now...', err);
    
        process.exit();
    
    });

}

module.exports=connecttomongo;

//dxhhLQKoLISBcweD

