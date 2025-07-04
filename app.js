const express=require("express");
const university=require("./routes/universityRoutes")
const student =require("./routes/studentRoutes")
const app=express();
app.use(express.json()); 



app.use('/api/university',university);
app.use('/api/student',student)








module.exports=app;
