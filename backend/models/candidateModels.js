const mongoose = require("mongoose");

const candidatesSchema= new mongoose.Schema({
    email:{type:"String"},
    collage:{type:"String"},
    year:{type:"Number"},
    phoneNo:{type:"Number"},
    allJobs:[{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Jobs",
          },
        applied:{type:"Boolean"},
        rejected:{type:"Boolean"},
        accepted:{type:"Boolean"},
    }],

})

module.exports= mongoose.model("Candidates" ,candidatesSchema);