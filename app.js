const express = require('express');
const app = express();
const path = require('path');

const config = require('./config');
const indexRoute = require('./routes/index');
//const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');
//const express_mongo = require('express-mongo-db');
const Mongoose = require('mongoose');
const expressValidator = require('express-validator');
const flash = require("express-flash");
const session = require('express-session');
const cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(expressValidator())

app.use(cookieParser('keyboard cat'));
app.use(session({
    secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
  }));
  
app.use(flash());

app.use('/' , indexRoute)

Mongoose.connect(config.database.url,{useUnifiedTopology : true , useNewUrlParser : true} , 
    (err,db) =>{
    if (err == null){
        console.log("Connected successfully to mongodb") 
    } else {
        console.log("Please Run mongodb")
    }
})

// MongoClient.connect(config.database.url,{useUnifiedTopology : true} , (err,db) =>{
//     if(db && db.isConnected) {
//         console.log("Mongodb Connected")
//         var doc = { name: "Roshan", age: "22" };
    
//         // insert document to 'users' collection using insertOne
//         db.users.insert(doc, function(err, res) {
//             if (err) throw err;
//             console.log("Document inserted");
//             // close the connection to db when you are done with it
//             db.close();
//         });
//     } else {
//         console.log("Please connect Mongodb")
//     }
// })


// MongoClient.connect('mongodb://localhost:27017/', {useUnifiedTopology : true , useNewUrlParser: true},
//      function (err, db) {
//     if (err) throw err;

//    // let database = db.db('nodejsapp');

//     // var myStudent = { name: "Jai Sharma", address: "E-3, Arera Colony, Bhopal" };
//     // database.collection("users").insertOne(myStudent, function (err, result) {
//     //     if (err) throw err;
//     //     console.log("1 Recorded Inserted");
//     //     db.close();
//     // });

//     //app.use(database);

// });

//app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');


app.listen(8001 , ()=>{
    console.log("Server Started")
})

