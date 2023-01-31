const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connection Is Estabilished!!');
})
.catch((err)=>{
    console.log(`err is : ${err}`)
})