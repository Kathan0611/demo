const express = require("express");
const mongoose = require("mongoose");

const connectDB = async(req,res)=>{
     try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log("database connected");
     }
     catch(err){
        console.log(err);
     }


}
connectDB();

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        reuired:true
    }


});

const user = await mongoose.model('user',userSchema);


app.get('/api',async(req,res)=>{
    try{
        const user1 =await user.find({});
        res.json(user1);
    } 
    catch(err){
      console.log(err);
    }
});

app.post('/api',async(req,res)=>{
   
        const {username,surname}=req.body;
        const user1 =await user.create({
            username,
            surname
        })
         user1.save();
        console.log("succfully add user1");
        res.send(user1);
  
})
app.put('/api/:id',async(req,res)=>{
            const {id}=req.params;
            const {username,surname}=req.body;
            const user1=await user.findById(id);
        if(user1){
            try{
                 user1.username=username;
                 user1.surname=surname;
                 console.log("Succefullly updated");
                 res.json(user1);
                 await user1.save();
            }
            catch(err){
                console.log(err);
            }
        }
    
});

app.delete("/api/:id",async(req,res)=>{
    const {id}=req.params;
    const user1 =await user.findByIdAndDelete(id);
    if(user1){
        try{
            console.log("Succefully deleted");
            res.json(user1);
        }
        catch(err){
            console.log(err);
        }
    }
});

app.listen(3000,(req,res)=>{
    console.log("server run on port 3000");
});








