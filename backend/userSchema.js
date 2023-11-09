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
})


const User = mongoose.model("User",Userschema);

module.exports=User;