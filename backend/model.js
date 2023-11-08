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
    BlogLike: {
        type: Number,
        // default: 0, 
    },
    BlogComments:{
        type:Array
    }
})

const Model=mongoose.model("Model",UserSchema);
 
module.exports=Model;