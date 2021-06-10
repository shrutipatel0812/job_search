const router = require("express").Router();
const Recruiter=require('../models/recruitersModel');
const Candidate=require('../models/candidateModels');

router.post('/:id/moreInfo' , async(req,res)=> {
    try{
        const {companyName,companyDescription,currentJobRole,workExperience}=req.body;
        if (!companyName || !companyDescription || !currentJobRole||!workExperience)
        return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

        const foundRecruiter= await Recruiter.updateOne({_id:req.params.id},{
            $set:{ 
                companyName,
                companyDescription,
                currentJobRole,
                workExperience}
        } );
        if(!foundRecruiter)
        return res
        .status(400)
        .json({ errorMessage: " no recruiter." });

        console.log(foundRecruiter);
        res.status(500).send();

    }catch (err) {
        console.error(err);
        res.status(500).send();
    }

})

router.get('/createdJobs/:_id',async(req,res)=>{
    try{
        const recruiter = await Recruiter.findById(req.params._id);
        res.json(recruiter.createdJobs);
    }catch(err){
        console.error(err);
        res.status(500).send();
    } 
})

router.post('accepted/:id/:_id', async(req,res)=>{
    try{
        const foundcandidate= await Candidate.updateOne({_id:req.params._id},{
            $set:{ 
                
            }
        });

    }catch(err){
        console.error(err);
        res.status(500).send();
    }
})

router.post('rejected/:id/:_id', async(req,res)=>{
    try{

    }catch(err){
        console.error(err);
        res.status(500).send();
    }
})


module.exports = router;