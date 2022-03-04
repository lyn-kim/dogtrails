const path = require('path');
const mime = require('mime');
const multer = require('multer');
const multerS3 = require('multer-s3');
const S3 = require('aws-sdk/clients/s3');

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_S3_BUCKET,
  acl: 'public-read',
  key: (req, file, done) => {
    const fileExtension = path.extname(file.originalname);
    const key = `${Date.now()}${fileExtension}`;
    done(null, key);
  },
  contentType: (req, file, done) => {
    const contentType = mime.getType(file.originalname);
    done(null, contentType);
  }
});

const uploadsMiddleware = multer({
  storage: storage
}).single('file-to-upload');

module.exports = uploadsMiddleware;
