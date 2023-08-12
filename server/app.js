import express from "express";
import cors from "cors";
import router from './routes/routes.js';
import DBConnection from "./database/db.js";
const app=express();
app.use(cors());
app.use('/',router)
const PORT=5050

DBConnection();

app.listen(PORT,() =>{
    console.log("server started")
})
