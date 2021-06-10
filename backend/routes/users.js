const router = require("express").Router();
const User = require("../models/usersModel");
const Recruiter = require("../models/recruitersModel");
const Candidate =require("../models/candidateModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



require("dotenv").config();


router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordVerify ,userType} = req.body;

    // validation

    if (!email || !password || !passwordVerify||!userType)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });

    if (password !== passwordVerify)
      return res.status(400).json({
        errorMessage: "Please enter the same password twice.",
      });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user account to the db

    const newUser = new User({
      email,
      passwordHash,
      userType
    });

    //if user is recruiter
    const savedUser = await newUser.save();
    console.log(savedUser);
    
    

    if(userType ==="recruiter"){
      const newRecruiter = new Recruiter({
        _id:savedUser._id,
        email,
      });
      const savedRecruiter = await newRecruiter.save();
      console.log(savedRecruiter);
      
    }else{
      //if user is candidate
      
        const newCandidater = new Candidate({
          _id:savedUser._id,
          email,
        })
      const savedCandidate = await newCandidater.save();
      console.log(savedCandidate);
    }

    

    // sign the token

    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
  
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    // sign the token

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
       
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});


router.get('/loggedIn' ,(req,res)=>{
  try{
        
    const token = req.cookies.token;
    if(!token){
        return res.json(false);
    }

    jwt.verify(token ,process.env.JWT_SECRET);

  res.send(true);
}catch(err){
    res.json(false)
}
})


router.get('/userId' ,(req,res)=>{
  try{
        
    const token = req.cookies.token;
    if(!token){
        return res.json("");
    }

    const verified = jwt.verify(token ,process.env.JWT_SECRET)
        
        req.user=verified.user;
      console.log(req.user);
  res.send(req.user);
}catch(err){
    res.json("")
}
})


router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
     
    })
    .send();
});

  module.exports = router;