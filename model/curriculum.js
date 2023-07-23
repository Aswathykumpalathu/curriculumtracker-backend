const mongoose =require('mongoose');
const CurriculumSchema = mongoose.Schema({
    requirementname:{
        type:String,
        required:true
       },
       area: {
        type: String,
        enum: ['FSD', 'ML-AI', 'DSA','RPA','ST','CSA'],
        default: 'FSD',
      },
        institution:{
            type:String,
          
          },
          category: {
            type: String,
            enum: ['Retail', 'Academic', 'Corporate','Govt'],
            default: 'Academic',
          },
            hours:{
                type:String,
                required:true
               },
               admin_upload_url: {
                type: String,
                
               
              },
                
              faculty_comments :{
                type:String
              },

              faculty_upload_url: {
                type: String,
              },
              status:{
                type:String
              }  
                     
  
    
})

const CurriculumModel=mongoose.model('curriculum',CurriculumSchema);
module.exports=CurriculumModel;