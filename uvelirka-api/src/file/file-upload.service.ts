import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ApiConfigService } from '../config/api-config.service';
import firebase from 'firebase-admin';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function createHash(length: number) {
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

@Injectable()
export class FileUploadService {
  AWS_S3_BUCKET: string;
  s3: AWS.S3;

  private storage: firebase.storage.Storage;

  constructor(
    private readonly config: ApiConfigService,
  ) {
    // this.AWS_S3_BUCKET = config.get('AWS_S3_BUCKET');
    // this.s3 = new AWS.S3({
    //   credentials: {
    //     accessKeyId: config.get('AWS_S3_ACCESS_KEY'),
    //     secretAccessKey: config.get('AWS_S3_SECRET_ACCESS_KEY'),
    //   },
    // });

    this.storage = firebase.storage(firebase.initializeApp({
      credential: firebase.credential.cert(JSON.parse(config.get('FIREBASE_API_KEY'))),
      databaseURL: 'https://lamp-chat-default-rtdb.europe-west1.firebasedatabase.app',
    }));
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    return this.uploadFileToFirebaseStorage(file);

    // return this.uploadFileToS3Storage(file);
  }

  private async uploadFileToFirebaseStorage(file: Express.Multer.File): Promise<string> {
    return this.uploadFileViaBuffer(
      `${createHash(10)}_${file.originalname}`,
      file.buffer,
    );
  }

  public async uploadFileViaBuffer(name: string, buffer: Buffer): Promise<string> {
    const bucketFile = this.storage
      .bucket(this.config.get('FIREBASE_BUCKET'))
      .file(name);

    await bucketFile.save(buffer, { public: true });

    return bucketFile.publicUrl();
  }

  private async uploadFileToS3Storage(file: Express.Multer.File): Promise<string> {
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  private async s3_upload(file, bucket, name, mimetype): Promise<string> {
    try {
      let s3Response = await this.s3.upload({
        Bucket: bucket,
        Key: `${createHash(10)}_${name}`,
        Body: file,
        ACL: 'public-read',
        ContentType: mimetype,
        ContentDisposition: 'inline',
      }).promise();

      return s3Response.Location;
    } catch (e) {
      console.log(e);

      return null;
    }
  }
}