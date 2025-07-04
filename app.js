const express=require("express");
const university=require("./routes/universityRoutes")
const student =require("./routes/studentRoutes")
const cookieParser = require('cookie-parser');
const app=express();
app.use(express.json()); 

app.use(cookieParser())

app.use('/api/university',university);
app.use('/api/student',student)








module.exports=app;
