const express = require('express');
const fileUpload = require('express-fileupload');
const ObjectStore = require('./objectstore');
const uuidv4 = require('uuid/v4');
const _ = require('lodash')

let UploadFileList = []

const app = express();
app.use(fileUpload())
const port = process.env.PORT || 5000;

app.get('/files/get/:fileId', async (req, res) => {

  let foundFile = _.find(UploadFileList, { key: req.params.fileId })

  if (!foundFile) {
    return res.status(500).json({
      error: 'Could not find file for key: ' + req.params.fileId
    })
  }

  let dataStream = await ObjectStore.getFile(foundFile.Name)

  res.setHeader('Content-disposition', 'attachment; filename=' + foundFile.Name);

  dataStream.on('data', function (chunk) {
    res.write(chunk)
  })

  dataStream.on('end', function () {
    res.end()
  })

  dataStream.on('error', function (err) {
    console.log(err)
    res.end()
  })
})

app.get('/files/list', (req, res) => {

  return res.json({
    docs: UploadFileList
  })

  // ObjectStore.getFileList().then((docs) => {
  //   return res.json({
  //       docs: docs
  //   })
  // }).catch((err) => {
  //   return res.json({
  //       error: err
  //   })
  // })
})

app.post('/files/add', (req, res) => {


  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let newFile = req.files.newFile;

  ObjectStore.saveFile(newFile.name, newFile.data, newFile.data.length).then((etag) => {
    return res.json({
      newId: etag
    })
  }).then(() => {
    UploadFileList.push({
      key: uuidv4(),
      Name: newFile.name,
      Size: newFile.data.length
    })
  }).catch((err) => {
    console.log(err)
    return res.status(500).json({
      error: err.message
    })
  })


})

app.listen(port, () => console.log(`Listening on port ${port}`));