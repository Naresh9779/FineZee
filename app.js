const express=require("express");
const register_login=require("./routes/register_loginRoutes");
const university=require("./routes/universityRoutes")
const app=express();
app.use(express.json()); 


app.use('/api/Register_Login',register_login)
app.use('/api/university',university);








module.exports=app;
