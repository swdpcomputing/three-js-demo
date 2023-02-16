const { S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3"); // Lambda Layer

const REGION = "eu-west-2";
const s3Client = new S3Client({ region: REGION });

exports.handler = async () => {
  try {
    const data = await s3Client.send(
      new ListObjectsCommand({ Bucket: "texture-demo-texture-storage-0.0.2" })
    );

    const fileNames = data.Contents.map((item) => item.Key);
    const bodyData = { fileNames: fileNames };

    console.log("Success");

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: bodyData,
      }),
    };
  } catch (err) {
    console.log("Error", err);
  }
};
