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

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/signin", (req, res) => {
    res.render("signin");
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
                res.render("home");
            }else {
                res.render("loginfail");
            }
        });
});

app.get("/signupsubmit", (req, res) => {
    
    
    const email = req.query.email;
    const password = req.query.password;
    const rpwd = req.query.rpwd;

//Adding new data to collection
    db.collection("users")
        .add({
    
            email: email,
            password: password,
            rpwd: rpwd,
        })
        .then(()=>{
            res.render("home");
        });
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

