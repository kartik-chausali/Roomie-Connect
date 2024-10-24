/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'
import fs from 'fs'
import path from "path";
import formidable from 'formidable'
import { promisify } from "util";
import { NextApiRequest, NextApiResponse } from "next";
import {IncomingForm, Fields, Files} from 'formidable';
//Since you're now sending the file itself (not the file path), 
//you'll need to use a middleware like formidable to parse the file from the request.
// Disable Next.js's default body parser for this API route
// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   };

 // Helper function to parse the form data using formidable
// const parseForm = async (req: NextApiRequest): Promise<{ fields: Fields; files: Files }> => {
//     const form = new IncomingForm(); // Correct way to instantiate the form
    
//     return new Promise((resolve, reject) => {
//       form.parse(req, (err, fields, files) => {
//         if (err) reject(err);
//         resolve({ fields, files });
//       });
//     });
//   };

export async function POST(req:Request){
    
    console.log("inside post");

  
    // const  body  = await req.json();
    // const {filePath, name} = body;
    try{
    // const {fields, files} = await parseForm(req);
    // const file = files.file ? (Array.isArray(files.file) ? files.file[0] : files.file) : undefined; // Assuming "file" is the form field name for file upload
    // if (!file) {
    //     return res.status(400).json({ message: 'No file uploaded' });
    //   } 
    // const filePath = file.filepath; // Get the temporary path of the uploaded file
    // const fileName = file.originalFilename || 'unknown_file'; // Get the original filename

    const formData = await req.formData();
    const file = formData.get('file');
    const fileName = formData.get('name');

    const accessKeyId = process.env.AWS_ACCESS_KEY
    const secretAccessKey= process.env.AWS_SECRET_KEY
    const region = process.env.AWS_REGION
    const bucketName = process.env.S3_BUCKET_NAME
    if (!accessKeyId || !secretAccessKey || !region || !bucketName) {
        return new Response(JSON.stringify({ message: 'AWS credentials or bucket configuration missing' }), { status: 500 });
      }

    const s3 = new S3Client({
       region,
       credentials:{
        accessKeyId,
        secretAccessKey
       }
        });
   
   
    if (!file || !(file instanceof Blob)) {
        return new Response(JSON.stringify({ message: 'No file uploaded or invalid file' }), { status: 400 });
      }

     if (typeof fileName !== 'string') {
      return new Response(JSON.stringify({ message: 'Invalid file name' }), { status: 400 });
    }

       // Convert the file into a buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const uploadParams = {
        Bucket:  process.env.S3_BUCKET_NAME,
        Key: fileName || 'unknown_file',
        Body:fileBuffer,
        ContentType: file.type || 'application/octet-stream',
    }

    const result = await s3.send(new PutObjectCommand(uploadParams));

    const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`

    return NextResponse.json({ message: 'File uploaded successfully', imageUrl })
    }catch (error) {
        console.error('Error during file upload:', error);
        return NextResponse.json({ message: 'File upload failed', error })
      }

}