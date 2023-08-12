 import mongoose from "mongoose";


const DBConnection  = async() =>{
      const MONGODB_URI="mongodb+srv://vishalsair2005:vishal@cluster0.aexr9ir.mongodb.net/?retryWrites=true&w=majority"
    try{
      await mongoose.connect(MONGODB_URI,{useNewUrlParser:true});
      console.log("connected to database")
    }catch(error){
        console.error("error",error.message)
    }
}   
export default DBConnection;