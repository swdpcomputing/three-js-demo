const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3"); // Lambda Layer

const REGION = "eu-west-2";
const s3Client = new S3Client({ region: REGION });

export const bucketParams = {
  Bucket: "texture-demo-texture-storage-0.0.2",
  // Key: "KEY",
};

exports.handler = async (event) => {
  bucketParams
  try {
    // Get the object} from the Amazon S3 bucket. It is returned as a ReadableStream.
    const data = await s3Client.send(new GetObjectCommand(bucketParams));
    // Convert the ReadableStream to a string.
    return await data.Body.transformToString();
  } catch (err) {
    console.log("Error", err);
  }
};
