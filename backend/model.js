const mongoose = require("mongoose");

const UserSchema= mongoose.Schema({
    BlogName:{
        type:String
    },
    Blogimg:{
        type:String
    },
    Blogtags:{
        type:Array
    },
    BlogContent:{
        type:String
    },
})

const Model=mongoose.model("Model",UserSchema);
 
module.exports=Model;