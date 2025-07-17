/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'
import prisma from "@/lib/singletonDb";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

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
    

    
    const session = await getServerSession(NEXT_AUTH);
  
    try{
  

    const formData = await req.formData();
    const file = formData.get('file');
    const fileName = formData.get('name');

    console.log('entries', formData.getAll('locations'), formData.get('profession'), formData.get('budget'), formData.get('about'), formData.get('gender'), formData.get('lookingFor'))
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
    
    const existingPost = await prisma.roomatePost.findUnique({
        where:{
            userId: session?.user.id
        }
    });

    if(existingPost){
        return NextResponse.json({msg:"A post with userId already exists"}, {status:401});
    }
    const result = await s3.send(new PutObjectCommand(uploadParams));

    const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`

    const post = await prisma.roomatePost.create({
        data:{
            image:imageUrl,
            locations: formData.getAll('locations') as string[],
            profession:formData.get('profession') as string,
            about:formData.get('about') as string,
            gender: formData.get('gender') as string,
            budget: formData.get('budget') as string,
            lookingFor: formData.get('lookingFor') as string,
            name: formData.get('name') as string,
            user: {connect:{id: session?.user.id}}
        }
    })
   
     return NextResponse.json({ message: 'Posted successfully', post } )
    }catch (error) {
  
        console.error('Error during file upload:', error);
        return NextResponse.json({ message: 'File upload failed', error })
      }

}

export async function GET(){
    try{
        const response = await prisma.roomatePost.findMany();
        return NextResponse.json({data:response})
    }catch(error){
        return NextResponse.json({error} , {status:411})
    }
}