const mongoose = require("mongoose");

const recruitersSchema= new mongoose.Schema({
    email:{type:"String"},
    companyName:{type:"String"},
    companyDescription:{type:"String"},
    currentJobRole:{type:"String"},
    workExperience:{type:"String"},
    createdJobs:[{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Jobs",
        }
    }],
})

module.exports= mongoose.model("Recruiters" ,recruitersSchema);