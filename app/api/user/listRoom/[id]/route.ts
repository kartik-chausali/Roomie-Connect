import prisma from "@/lib/singletonDb";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(req: Request , {params}:Params){
    const {id } = params
    try{
        const room = await prisma.roomPost.findFirst({
            where:{
                id: id
            }
        })
        return new Response(JSON.stringify({room}) , {status:200});
    }catch(error){
        return NextResponse.json({error} , {status:411})
    }
    
}