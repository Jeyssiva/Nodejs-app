const express = require('express');
const app = express();

app.listen(8001 , ()=>{
    console.log("Server Started")
})

app.get('/' , (req,res) => {
    res.send({success : true , msg : "Welcome to Nodejs App"})
})
