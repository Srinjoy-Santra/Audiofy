const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');
const app = express();

const uploadPath = `${__dirname}/../app/public/uploads/`;


app.use(fileUpload());
app.use(cors());

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  const fileName = file.name.replace(/ /g, '_')

  file.mv(uploadPath + fileName, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName, filePath: `/uploads/${fileName}` });
  });
});

app.get('/files', async (req,res) => {
  
  let musicFiles, fileDetails;
  try{
    musicFiles = await fs.promises.readdir(uploadPath)
  console.log(musicFiles)
 
  
  //let details = await fs.stat(musicFiles[0])
  //console.log(details.size)

  res.json(musicFiles)
    

  
  }
  catch(e)
  {
    res.json(e)
  }
  

})


app.listen(5001, () => console.log('Server Started...'));