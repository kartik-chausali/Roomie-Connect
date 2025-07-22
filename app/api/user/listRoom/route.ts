/* eslint-disable @typescript-eslint/no-unused-vars */

import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/singletonDb";
import { PutObjectAclCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const session = await getServerSession(NEXT_AUTH);

    try{

        const formData = await req.formData();

        const accessKeyId = process.env.AWS_ACCESS_KEY
        const secretAccessKey= process.env.AWS_SECRET_KEY
        const region = process.env.AWS_REGION
        const bucketName = process.env.S3_BUCKET_NAME

    if (!accessKeyId || !secretAccessKey || !region || !bucketName) {
        return new Response(JSON.stringify({ message: 'AWS credentials or bucket configuration missing' }), { status: 500 });
      }
      console.log("log1")
      const s3 = new S3Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey
        }
      })

      const files = formData.getAll('image');
      if (!files) {
        return new Response(JSON.stringify({ message: 'No file uploaded or invalid file' }), { status: 400 });
      }
      console.log("log2")
      const tempImages = []
     for(const file of files){
        console.log("on backend" , file);
        if(!(file instanceof Blob)){
            return new Response(JSON.stringify({ message: 'No file uploaded or invalid file' }), { status: 400 });
        }
        const fileName = file.name
        console.log("log3")
        const arrayBuffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(arrayBuffer);

        const uploadParams = {
        Bucket:  process.env.S3_BUCKET_NAME,
        Key:  fileName ,
        Body:fileBuffer,
        ContentType: file.type || 'application/octet-stream',
        }

        const existingPost = await prisma.roomPost.findUnique({
            where:{
                id: session?.user.id
            }
        })

         if(existingPost){
        return new Response(JSON.stringify({msg:"A post with userId already exists"}), {status:401});
         }
    console.log("log4")
    const result = await s3.send(new PutObjectCommand(uploadParams))
        tempImages.push(`https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`);
      }

      const post = await prisma.roomPost.create({
        data:{
            images: tempImages,
            user: {connect:{id: session?.user.id}},
            propertyName: formData.get('propertName') as string,
            owner: formData.get('owner') as string,
            rent: Number(formData.get('rent') as string ),
            roomType: formData.get('roomType') as string,
            location: formData.get('location') as string,
            latitude: formData.get('latitude') as string,
            longitude: formData.get('longitude') as string,
            about: formData.get('about') as string,
            email: formData.get('email') as string
        }
      })
      return new Response(JSON.stringify({post}) , {status:200});

    }catch(error){
        console.error('Error during file upload:', error);
         return new Response(JSON.stringify({ message: 'File upload failed', error }))
    }
}