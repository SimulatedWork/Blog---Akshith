const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
// const isEmail=require("validator");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const Model = require("./model");

const User=require("./userSchema");

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected successfully");
    });
  })
  .catch((err) => {
    console.log(err);
  });


  
app.get("/blogdata", async (err, data) => {
  const list = await Model.find();
  data.status(200).send(list);
});
  
// app.post("/blogPost",async(req,res)=>{
//   const{BlogName, Blogimg, Blogtags, BlogContent}=req.body;

//   const model=Model();

//   model.BlogName=BlogName;
//   model.Blogimg=Blogimg;
//   model.Blogtags=Blogtags;
//   model.BlogContent=BlogContent;

//   model.save(async (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
      
//       res.status(200).send(data);
//     }
//   });
// })

app.post("/blogPost", async (req, res) => {
  const { BlogName, Blogimg, Blogtags, BlogContent } = req.body;

  const blogPost = Model({
    BlogName,
    Blogimg,
    Blogtags,
    BlogContent,
  });

  try {
    const savedBlogPost = await blogPost.save();
    res.status(200).send(savedBlogPost);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get("/blogview/:id", async (req, res) => {
  const { id } = req.params;
  const list = await Model.findById(id);
  res.status(200).json(list);
});
  

// app.get("/blogtags", async (err, data) => {
//   const datas = await Model.aggregate([
//     { $project: { Blogtags: 1 } }
//   ]);
  
//   data.status(200).send(datas);
// });

app.get("/blogtags", async (req, res) => {
  try {
    const uniqueTags = await Model.aggregate([
      { $group: { _id: "$Blogtags" } },
      { $project: { _id: 0, Blogtags: "$_id" } },
    ]);
    res.status(200).json(uniqueTags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
});



app.put("/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id",id)
    const blog = await Model.findById(id);
    console.log("boolean",blog)
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    blog.BlogLike += 1;
    // console.log(blog);
    await blog.save();
    res.status(200).json({ likes: blog.BlogLike});
  } catch (error) {
    console.error("Error liking the blog post:", error);
    res.status(500).json({ error: "Failed to like the blog post" });
  }
});

app.get("/displaylike/:id", async (req, res) => {
  const { id } = req.params;
  const list = await Model.findById(id).select("BlogLike");
  res.status(200).json(list);
});


app.post('/register', async(req,res)=>{
  const {
    Username,
    Useremail,
    Userpassword,
  } = req.body;
  if (!Useremail || !Userpassword)
    return res.status(400).json({ msg: "Password and email are required" });
  if (Userpassword.length < 8) {
    return res
      .status(400)
      .json({ msg: "Password should be at least 8 characters long" });
  }
  const newpassword= await bcrypt.hash(Userpassword,10);
  console.log(req.body);
  try{
    const user = await User.findOne({ Useremail:Useremail });
        // user.validate[isEmail,"Please enter a valid email"];
      
  if (user){ 
    console.log("user fund")
    const token = jwt.sign({
      email: user.email,
      name: user.name,
      _id:user._id,
    },"akshith29")
    return res.status(400).json({ msg: "User already exists","token":token })
}
     else{
      const model = new User({
        Username,
        Useremail,
        Userpassword:newpassword,
      })
       
         const duser = await model.save();
         if(duser){
          const token = jwt.sign({
            email: duser.email,
            name: duser.name,
            _id:duser._id,
          },"akshith29")
          res.status(201).json({message: "sucess","token":token})
        }
        else{
          res.status(501).json({message: "tryagain"})
        }
     }
    

  }
  catch (err){
console.log(err);
  }

})
