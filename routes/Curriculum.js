const router = require('express').Router();
const jwt =require("jsonwebtoken");
const curriculumDATA = require('../model/curriculum')
router.get('/curriculumlist',async(req,res)=>{
    try {
        let data = await curriculumDATA.find()
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})
router.get('/curriculumlist/:id',async(req,res)=>{
    try {
        let id = req.params.id
        let data = await curriculumDATA.findById(id)
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})
router.post('/curriculumlist',async(req,res)=>{
    try {
        console.log(req.body)
        const { requirementname, area, institution ,category, hours, admin_upload_url} = req.body;
        const curriculum = await curriculumDATA({ requirementname, area, institution ,category, hours, admin_upload_url});
        curriculum.save()  ;
        res.json({message:"Created Succesfully"});
        // jwt.verify(req.body.token,"ict",(error,decoded)=>{
        //     if (decoded && decoded.email) {
                
        //         curriculum.save()  ;
        //         res.json({message:"Created Succesfully"});
                
        //     } else {
        //         res.json({message:"Unauthorised User"});
                
        //     }
    
        //    })
        
    } catch (error) {
        console.log(error)
        res.json('error')
    }
})
router.put('/curriculumlist/:id',async(req,res)=>{
    try {
       id = req.params.id
       let updateData = {$set:req.body}
       const updated = await curriculumDATA.findByIdAndUpdate(id, updateData)
        res.json({message:"Updated successfully"})
    } catch (error) {
        // console.log(error)
        res.send('error')
    }
})
router.delete('/curriculumlist/:id',async(req,res)=>{
    try {
        let id = req.params.id
       const updated = await curriculumDATA.findByIdAndDelete(id)
       res.json({message:"Deleted successfully"})
    } catch (error) {
        console.log(error)
        res.send('error')
    }
})
module.exports = router