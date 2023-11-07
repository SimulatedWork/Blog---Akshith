const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const Model = require("./model")

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


app.post("/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Model.findById(id);

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

