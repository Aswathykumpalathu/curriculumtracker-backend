const router = require('express').Router();
const jwt =require("jsonwebtoken");
const curriculumDATA = require('../model/curriculum')
router.get('/curriculumlist',async(req,res)=>{
 const userToken = req.query.userToken;
  console.log(userToken);
    try {
        jwt.verify(userToken,"ict",(error,decoded)=>{
            if (decoded && decoded.email) {
                console.log('authorisexd')
                curriculumDATA.find().then(data => {
                    console.log(data);
                    res.send(data);
                  }).catch(error => {
                    console.error(error);
                    res.status(500).send("Internal Server Error");
                  });
              
                
            } else {
                console.log('unauth not sending dat')
                res.json({message:"Unauthorised User"});
                
            }
    
           })
       
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
router.post('/curriculumlist', (req,res)=>{
    try {
        console.log(req.body)
        const { requirementname, area, institution ,category, hours, admin_upload_url ,faculty_comments, faculty_upload_url,status} = req.body;
        const curriculum =  curriculumDATA({ requirementname, area, institution ,category, hours, admin_upload_url ,faculty_comments, faculty_upload_url,status});
        // curriculum.save()  ;
        // res.json({message:"Created Succesfully"});
        jwt.verify(req.body.token,"ict",(error,decoded)=>{
            if (decoded && decoded.email) {
                
                curriculum.save()  ;
                res.json({message:"Created Succesfully"});
                
            } else {
                res.json({message:"Unauthorised User"});
                
            }
    
           })
        
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
router.put('/curriculumlist/approve/:id',async(req,res)=>{
    try {
        console.log('api update approve')
        let id = req.params.id
       const updated = await curriculumDATA.findById(id)
       updated.status = 'Approve'
       updated.save()
       res.json({message:"Approved"})
    } catch (error) {
        console.log(error)
        res.send('error')
    }
})
router.post('/curriculum/search',async (req,res) => {
    // console.log('api hitted')
    // const searchQuery = req.body.query;
    // console.log('testing')
    // // console.log(searchQuery)
    // const filter = {
    //   $or: [
    //     { requirementname: { $regex: '.*' + searchQuery + '.*', $options: 'i' } },
    //     { area: { $regex: '.*' + searchQuery + '.*', $options: 'i' } },
    //     { institution: { $regex: '.*' + searchQuery + '.*', $options: 'i' } },
    //     { category: { $regex: '.*' + searchQuery + '.*', $options: 'i' } },
    //     // Add more fields to search here
    //   ],
    // };

    // console.log('filter:', filter);

    // const result = await curriculumDATA.find(filter);
    // console.log('response:', result);

    // res.json(result);
    try {
        const searchQuery = req.body.query;
        console.log(searchQuery)
        const filter = {
          $or: [
            { requirementname: { $regex: '.*' + searchQuery + '.*', $options: 'i' } },
            { area: { $regex: '.*' + searchQuery + '.*', $options: 'i' } },
            { institution: { $regex: '.*' + searchQuery + '.*', $options: 'i' } },
            { category: { $regex: '.*' + searchQuery + '.*', $options: 'i' } },
            // Add more fields to search here
          ],
        };
    
        console.log('filter:', filter);
    
        const result = await curriculumDATA.find(filter);
        console.log('response:', result);
    
        res.json(result);
      } catch (error) {
        console.error('Error searching curriculum:', error);
        res.status(500).json({ error: 'An error occurred while searching curriculum' });
      }
    
})
router.post('/curriculumlist/response/:id',async(req,res)=>{
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
module.exports = router
