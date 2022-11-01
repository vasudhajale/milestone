const express = require("express");
const app = express();
const port = 3000;


const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");



var serviceAccount = require("./key.json");

initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

app.set("view engine", "ejs");



app.get("/signin", (req, res) => {
    res.sendFile(__dirname+"/views/signin.html");
});


app.get("/signinsubmit", (req, res) => {
    const email = req.query.email;
    const password = req.query.password;

    db.collection("users")
        .where("email", "==", email)
        .where("password", "==", password)
        .get()
        .then((docs) => {
            if (docs.size > 0) {
                res.sendFile(__dirname+"/views/website.html");
                
            }else {
                res.send("loginfail");
            }
        });
});

app.get("/signupsubmit", (req, res) => {
    
    
    var email = req.query.email;
    var password = req.query.password;
    

//Adding new data to collection
    db.collection("users")
        .add({
    
            email: email,
            password: password,
            
        })
        .then(()=>{
            res.sendFile(__dirname+"/views/signin.html");
        });
});

app.get("/signup", (req, res) => {
    res.sendFile(__dirname+"/views/signup.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

