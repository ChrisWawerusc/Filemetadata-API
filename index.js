var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/') // Files will be saved in the 'uploads' directory
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

// Initialize Multer with storage options
const upload = multer({ storage: storage });

app.post("/api/fileanalyse", upload.single('upfile'),(req,res)=>{
  const filename = req.file.originalname; // Using file.originalname directly
  const filesize = req.file.size; // Using file.size directly
  const filetype = req.file.mimetype;

  res.json({name:filename,type:filetype, size:filesize})
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
