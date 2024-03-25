import { S3 } from "@aws-sdk/client-s3";
import AWS from "aws-sdk";
import fs from "fs";
import { resolve } from "path";

export async function downloadFromS3(file_key: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const s3 = new S3({
        region: "eu-north-1",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      });
      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_key,
      };
      s3.getObject(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const file_name = `/Users/berker/Applications/pdf${Date.now().toString()}.pdf`;
          if (data.Body instanceof require("stream").Readable) {
            const file = fs.createWriteStream(file_name);
            file.on("open", () => {
              data.Body?.pipe(file).on("finish", () => {
                resolve(file_name);
              });
            });
          } else {
            reject(new Error("Gönderilen data okunamadı."));
          }
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}