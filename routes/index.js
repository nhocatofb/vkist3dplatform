var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/temp');
  },
  filename: function (req, file, cb) {
      // Tên tập tin sau khi tải lên
      cb(null, file.originalname);
  }
});

function generateRandomFolderName() {
  const currentDate = new Date();
  return currentDate.getTime().toString(); // Sử dụng thời gian hiện tại làm tên thư mục ngẫu nhiên
}

// Khởi tạo middleware multer với cài đặt lưu trữ
const upload = multer({ storage: storage });

router.post('/upload', upload.array('files[]'), function(req, res, next) {
  console.log("OK")
  const tempFolderPath = path.join(__dirname, '../public/images/temp');
  const finalFolderPath = path.join(__dirname, '../public/images', generateRandomFolderName());
  console.log("OK 1")

  fs.mkdirSync(finalFolderPath, { recursive: true });

  console.log("OK 2")

  fs.readdirSync(tempFolderPath).forEach(file => {
      const oldPath = path.join(tempFolderPath, file);
      const newPath = path.join(finalFolderPath, file);
      fs.renameSync(oldPath, newPath);
  });

  console.log("OK 3")

  res.json({ message: finalFolderPath });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/show', function(req, res, next) {
  res.render('show', { title: 'Show' });
});

router.get('/modelview', function(req, res, next) {
  res.render('modelview', { title: 'Show' });
});

router.get('/loading', function(req, res, next) {
  res.render('loading', { title: 'Show' });
});

router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

router.get('/upload', function(req, res, next) {
  res.render('upload', { title: 'Upload' });
});

router.get('/mauvat', function(req, res, next) {
  res.render('mauvat', { title: 'Mau Vat' });
});

module.exports = router;
