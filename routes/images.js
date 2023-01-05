const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { Image } = require('../models/image');
const fs = require('fs')
const path = require('path');
const { resourceLimits } = require('worker_threads');



router.get('/', (req, res) => {
  const {page} = req.query;
  const options = {
  page: parseInt(page, 10) || 1,
  limit: 4
  }
  Image.paginate({}, options).then((items, err) => {
      if (!err) {
        let maxPages = items.totalPages
        res.render('images', { items: items.docs, page_count: maxPages });
          
      }
      else {
        console.log(err);
        res.status(500).send('An error occurred', err);
      }
  })
});


router.post('/save', (req, res) => {
  if(!req.user){
    res.send("Nincs bejelentkezve!")
  }else{
    var contentType = 'image/jpeg';
    let base64String=req.body.img;
    let base64Image = base64String.split(';base64,').pop();
    let date=Date.now();
    let sourceFilePath;
    let blobName;

    

     fs.writeFile(`./uploads/${date}.jpeg`, base64Image, {encoding: 'base64'}, function(err) {
        console.log('File created');
        sourceFilePath= path.resolve(`./uploads/${date}.jpeg`); 

        var obj = {
            author: req.user.name,
            img: {
                data: fs.readFileSync(`./uploads/${date}.jpeg`),
                contentType: 'image/png'
            }
          }
          Image.create(obj, (err, item) => {
            if (err) {
                console.log(err);
            }}); 
        })
  }
         
})
      


    
      
      
     
    
  


module.exports = router;
