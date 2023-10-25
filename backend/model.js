const mongoose = require("mongoose");

const UserSchema= mongoose.Schema({
    BlogName:{
        type:String
    },
    Blogimg:{
        type:String
    },
    Content:{
        type:String
    },
})

const Model=mongoose.model("Model",UserSchema);
 
module.exports=Model;