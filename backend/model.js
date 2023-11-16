const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model for storing user information
        required: true,
    },
    username:{
        type:String, 
    },
    text: {
        type: String,
        required: true,
    },
});


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
    BlogComments:[commentSchema],
    User_ID:{
        type:String
    }
})

const Model=mongoose.model("Model",UserSchema);
 
module.exports=Model;