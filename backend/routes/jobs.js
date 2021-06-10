const router = require("express").Router();
const Recruiter= require('../models/recruitersModel');
const Job = require("../models/jobsModel");

router.post("/:id/createJob" ,async(req,res)=>{
    try{
        const {jobTitle ,location,jobDescription}=req.body;
    
    if(!jobTitle || !location|| !jobDescription)
    return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    
    const recruiter= await Recruiter.findById(req.params.id)
    
    const newJob= await new Job({
        recruiterId:recruiter._id,
        jobTitle,
        location,
        jobDescription,
    })

    const savedJob = await newJob.save();
        console.log(savedJob);
        res.json(savedJob);
    
    const newJobId={_id:savedJob._id
        }
    const createdJobs =recruiter.createdJobs;
    createdJobs.push(newJobId);
        console.log(newJobId);
        console.log(createdJobs);

    const foundRecruiter= await Recruiter.updateOne({_id:req.params.id},{
            $set:{ 
                createdJobs:createdJobs}
        } );
    

    }catch(err){
        
            console.error(err);
            res.status(500).send();
    }
    
})

router.get('/' ,async(req,res)=>{
    try{
        const allJobs = await Job.find();
        res.json(allJobs);
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
})

module.exports=router;