const asyncHandler = require('express-async-handler')
//Desc Upload files
//Method GET /api/file/upload
//Access public

const uploadFile = asyncHandler(async(req,res)=> {
    const https = require('https');
    const fs = require('fs');
    //const  url = 'https://download.samplelib.com/mp4/sample-5s.mp4';
   // const localPath = __basedir+"/uploads/videos";
  // const localPath ="./uploads/videos/sample_file.mp4";
   const {url,file_name} = req.query
   if(url && file_name){
       
        const localPath =`./uploads/videos/${file_name}`;
        https.get(url, (response) => { 
            const file = fs.createWriteStream(localPath);
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => {
                    console.log("file download success");
                    res.send('upload success');
                })
            })
        }).on('error',(err) => {
            console.log(err);
        })
        res.send('upload success');
   }


})

module.exports = {uploadFile}