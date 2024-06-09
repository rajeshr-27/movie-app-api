const asyncHandler = require('express-async-handler')
//Desc Upload files
//Method GET /api/file/upload
//Access public

const uploadFile = asyncHandler(async(req,res)=> {
    const https = require('https');
    const fs = require('fs');

   const {url,file_name} = req.query
   if(url && file_name){
       
        const localPath =`./uploads/videos/${file_name}`;

        https.get(url, (response) => { 
            if (response.statusCode !== 200) {
                return res.status(response.statusCode).send('Failed to download file');
            }
            const file = fs.createWriteStream(localPath);
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => {
                    console.log("file download success");
                    res.send('upload success');
                })
            })
            file.on('error', (err) => {
                fs.unlink(localPath, () => { // Clean up the partially downloaded file
                    console.error('Error writing file', err);
                    res.status(500).send('Error writing file');
                });
            });
        }).on('error',(err) => {
            console.log(err);
        })
        
   }


})

module.exports = {uploadFile}