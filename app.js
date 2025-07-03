const express=require("express");
const register_login=require("./routes/register_loginRoutes");
const app=express();
app.use(express.json()); 


app.use('/api/Register_Login',register_login)







module.exports=app;
