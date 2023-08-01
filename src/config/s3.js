const S3Config = {
  accessKeyId: process.env.S3_ACCESS_KEY || 'AKIAYMQVE3PFZCNSRJX4',
  secretAccessKey: process.env.S3_SECRET_KEY || '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',
  region: process.env.S3_AWS_REGION || 'ap-southeast-1' // Contoh: 'us-west-1'
};

export default S3Config;
