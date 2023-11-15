const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
// const isEmail=require("validator");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const Model = require("./model");

const User=require("./userSchema");
const User_ID=process.env.ID;

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
  const { BlogName, Blogimg, Blogtags, BlogContent, User_ID } = req.body;

  const blogPost = Model({
    BlogName,
    Blogimg,
    Blogtags,
    BlogContent,
    User_ID,
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
    // console.log("id",id)
    const blog = await Model.findById(id);
    // console.log("boolean",blog)
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

const client = new OAuth2Client(User_ID);

// app.post("/token", async (req, res) => {
//   const { tokenold } = req.body;

//   const ticket = await client.verifyIdToken({
//     idToken: tokenold,
//     audience: User_ID,
//   });
//   const payload = ticket.getPayload();
//   console.log("payload",payload)
//   const email = payload.email;
//   const check = await Model.findOne({ Useremail: email });
//   if (!check) {
//     // create new account in database
//     const name = payload.Username;
//     const email = payload.Useremail;

//     const detail = new Model();
//     detail.Username = name;
//     detail.Useremail = email;
//     detail.withgoogle = true;

//     detail.save(async (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         // send response once database operation is complete
//         const token = jwt.sign({
//           email: data.Useremail,
//           name: data.Username,
//           _id:data._id,
//         }, "akshith10");
//         res.json({ status: "signed in successfully", user: token });
//       }
//     });
//   } else {
//     const token = jwt.sign({
//       "email": check.Useremail,
//       "name": check.Username,
//       "_id":check._id,
//     }, "akshith10");
//     res.json({ status: "signed in successfully", user: token });
//   }
// });


app.post("/token", async (req, res) => {
  const { tokenold } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenold,
      audience: User_ID,
    });

    const payload = ticket.getPayload();
    console.log("payload", payload);

    const email = payload.email;
    const check = await User.findOne({ Useremail: email });

    if (!check) {
      // create new account in database
      const name = payload.name;
      const email = payload.email;

      const detail = new User({
        Username: name,
        Useremail: email,
        withgoogle: true,
      });

      const data = await detail.save();
      
      // send response once database operation is complete
      const token = jwt.sign({
        email: data.Useremail,
        name: data.Username,
        _id: data._id,
      }, "akshith10");

      return res.status(201).json({ status: "signed in successfully", user: token });
    } else {
      const token = jwt.sign({
        email: check.Useremail,
        name: check.Username,
        _id: check._id,
      }, "akshith10");

      return res.status(201).json({ status: "signed in successfully", user: token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Internal Server Error" });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { Username, Useremail, Userpassword } = req.body;

    if (!Useremail || !Userpassword) {
      return res.status(400).json({ status: "Password and email are required" });
    }

    if (Userpassword.length < 8) {
      return res.status(400).json({ status: "Password should be at least 8 characters long" });
    }

    const hashedPassword = await bcrypt.hash(Userpassword, 10);

    const user = await User.findOne({ Useremail: Useremail });

    if (user) {
      const token = jwt.sign({
        email: user.Useremail,
        name: user.Username,
        _id: user._id,
      }, "akshith29");

      return res.status(400).json({ status: "User already exists", token: token });
    } else {
      const newUser = new User({
        Username,
        Useremail,
        Userpassword: hashedPassword,
      });

      const savedUser = await newUser.save();

      if (savedUser) {
        const token = jwt.sign({
          email: savedUser.Useremail,
          name: savedUser.Username,
          _id: savedUser._id,
        }, "akshith29");

        return res.status(201).json({ status: "Successfully Registered", token: token });
      } else {
        return res.status(501).json({ status: "Try again" });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "Internal Server Error" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { Useremail, Userpassword } = req.body;
    const check = await User.findOne({ Useremail: Useremail });

    if (!check) {
      return res.json({ status: "Please check email and password", user: null });
    }

    if (check.Userpassword) {
      const isPasswordValid = await bcrypt.compare(Userpassword, check.Userpassword);
      if (isPasswordValid) {
        const token = jwt.sign({
          email: check.Useremail,
          password: check.Userpassword,
          name: check.Username,
          _id: check._id
        }, "akshith");
        return res.json({ status: "Signed in successfully", user: token });
      } else {
        return res.json({ status: "Please check email and password", user: null });
      }
    }

    if (check.withgoogle) {
      const token = jwt.sign({
        email: check.email,
        _id: check._id,
        name: check.name
      }, "akshith01"); 
      return res.json({ status: "Signed in successfully", user: token });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "Internal Server Error", user: null });
  }
});


app.get("/userdata/:id", async (req, res) => {
  const { id } = req.params;
  const list = await User.findById(id);
  res.status(200).json(list);
});


app.put('/addComment/:blogId', async (req, res) => {
  const { userId,username ,text } = req.body;
  const { blogId } = req.params;

  try {
    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the blog post by ID
    const blog = await Model.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Add the comment to the blog post
    blog.BlogComments.push({ userId, text,username });
    
    // Save the updated blog post
    const updatedBlog = await blog.save();

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});