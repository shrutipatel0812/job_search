const mongoose = require("mongoose");

const jobsSchema= new mongoose.Schema({
    recruiterId: {type:mongoose.Schema.Types.ObjectId,
        ref:"Recruiters"
    },
    jobTitle:{type:"String"},
    location:{type:"String"},
    jobDescription:{type:"String"},
    appliedCandidates:[{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Candidates",
        }
    }],
})

module.exports= mongoose.model("Jobs" ,jobsSchema);