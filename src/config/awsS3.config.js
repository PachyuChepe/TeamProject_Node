// config/awsS3.config.js

import aws from 'aws-sdk';

export const s3Client = new aws.S3({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
