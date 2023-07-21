const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://aswathykumpalathu:Pulser90@curriculamdb.wmzttql.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('connected to atls');
})
.catch((e)=>{
    console.log('error cconnot connected')
})