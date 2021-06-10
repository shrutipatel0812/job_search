const router = require("express").Router();
const Candidate = require("../models/candidateModels");
const Jobs = require("../models/jobsModel");


router.post("/:id/moreInfo", async(req,res)=>{
    try{
        const{collage ,phoneNo , year }=req.body;

        if(!collage || !phoneNo || !year){
            return res
                .status(400)
                .json({errorMessage:"Please enter all required fields."})
        }

        const foundCandidate= await Candidate.findByIdAndUpdate({_id:req.params.id},{
            $set:{ 
                collage,
                phoneNo,
                year,
                }
        },{
            new:true,
            useFindAndModify:false
        } );

        //const modifiedInfo=await Candidate.findById(req.params.id);
        console.log(foundCandidate);
        if(!foundCandidate)
            return res
            .status(400)
            .json({ errorMessage: " no candidate." });

        console.log(foundCandidate);
        res.send();
        
    }catch(err){
        console.error(err);
        res.status(500).send();
    }

})

router.post('/apply/:id/:_id',async(req,res)=>{
    try{
        
        const candidate= await Candidate.findById({_id:req.params.id})

        console.log(candidate.allJobs);

        const newJob={_id:req.params._id,
                        applied:true,
                        rejected:false,
                        accepted:false
                    }
        const allJobs =candidate.allJobs;
            allJobs.push(newJob);
            console.log(newJob);
            console.log(allJobs);

        const foundcandidate= await Candidate.updateOne({_id:req.params.id},{
            $set:{ 
                allJobs
            }
        });

        const job= await Jobs.findById({_id:req.params._id})

        const candidateId={_id:req.params.id,}

        const appliedCandidates =job.appliedCandidates;
        appliedCandidates.push(candidateId);
        console.log(appliedCandidates);

    const foundJob= await Jobs.updateOne({_id:req.params._id},{
        $set:{ 
            appliedCandidates,
        }
    });

        res.send();
    }
    catch(err){
        console.error(err);
        res.status(500).send();
    }
})


router.get('/applied/:_id', async(req,res)=>{
    try{
        const candidate=await Candidate.findById(req.params._id)
        const allJobs=candidate.allJobs

        console.log(allJobs);

        const rejectedJobs=[];

        var i;
        for (i = 0; i < allJobs.length; i++) {
            if(allJobs[i].applied === true){
                rejectedJobs.push(allJobs[i]);
            }
        }

        console.log(rejectedJobs);

        res.send();
    }catch(err){
        console.error(err);
        res.status(500).send(); 
    }
})

router.get('/accepted/:_id', async(req,res)=>{
    try{
        const candidate=await Candidate.findById(req.params._id)
        const allJobs=candidate.allJobs

        console.log(allJobs);

        const rejectedJobs=[];

        var i;
        for (i = 0; i < allJobs.length; i++) {
            if(allJobs[i].accepted === true){
                rejectedJobs.push(allJobs[i]);
            }
        }

        console.log(rejectedJobs);

        res.send();
    }catch(err){
        console.error(err);
        res.status(500).send(); 
    }
})

router.get('/rejected/:_id', async(req,res)=>{
    try{
        const candidate=await Candidate.findById(req.params._id)
        const allJobs=candidate.allJobs

        console.log(allJobs);

        const rejectedJobs=[];

        var i;
        for (i = 0; i < allJobs.length; i++) {
            if(allJobs[i].rejected=== true){
                rejectedJobs.push(allJobs[i]);
            }
        }

        console.log(rejectedJobs);

        res.send();
    }catch(err){
        console.error(err);
        res.status(500).send(); 
    }
})

module.exports=router;