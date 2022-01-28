const express = require('express');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2


const app = express()

cloudinary.config({
  // cloud_name: process.env.CLOUD_NAME
  cloud_name: "sumana",
  api_key: "923212753929872",
  api_secret: "3BNYCNg7w_3B8lWqOVjK1pWF3Mo"

})

app.set('view engine', "ejs");

//middleware

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}))



app.get("/myget", (req, res) =>{
  console.log(req.body);
  res.send(req.query);
})
app.post("/mypost", async (req, res) =>{
  console.log(req.body);
  console.log(req.files);

  let result;
  let imageArray = [];

  // case - multiple images

  if(req.files){
    for (let index = 0; index < req.files.filename.length; index++) {
     
      result = await cloudinary.uploader.upload(req.files.filename[index].tempFilePath,{
        folder: 'users'
      })

      imageArray.push({
        public_id: result.public_id,
        secure_url: result.secure_url
      })
      
    }
  }

  
  
  //### usecase for single image
  //let file = req.files.filename
  // result = await cloudinary.uploader.upload(file.tempFilePath, {
  //   folder: 'users'
  // })
  console.log(result);
  details = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    result,
    imageArray
  }
  console.log(details);
  res.send(details);
})
app.get("/mygetForm", (req, res) =>{
 // console.log(req.body);
  res.render("getForm"); 
})
app.get("/mypostForm", (req, res) =>{
 // console.log(req.body);
  res.render("postForm");
})
app.listen(4000, ()=> console.log("Server is running at 4000"))