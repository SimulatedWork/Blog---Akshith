const mongoose = require("mongoose");

const Userschema = mongoose.Schema({

    Username:{
        type:String,
    },
    Useremail:{
        type:String
    },
    Userpassword:{
        type:String
    },
    withgoogle:{
        type:Boolean,
        trim:true,
    }
})


const User = mongoose.model("User",Userschema);

module.exports=User;