/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialsProvider  from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google'
import prisma from './singletonDb';
import {JWTPayload, SignJWT, importJWK } from 'jose'
import { DefaultSession } from 'next-auth';
import { toast } from '@/hooks/use-toast';
import { redirect } from 'next/dist/server/api-utils';

export interface session extends DefaultSession{
    user: {
      id: string;
      jwtToken: string;
      email: string;
      name: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    token: string;
  }

export const NEXT_AUTH = {
    providers:[
        CredentialsProvider({
            name:"Email",
            credentials:{
                name:{label:"Name", type:"text", placeholder:"john doe"},
                username:{label:"Email", type:"text", placeholder:"example@gmail.com" },
                password:{label:"Password", type:"password", placeholder:"password"}
            },
            async authorize(credentials:any){
               
              
                try{
                const response = await prisma.user.findFirst({
                    where:{
                        email:credentials.username,
                        password:credentials.password
                    }
                })

                if(response){
                    const jwt = generateToken({
                        id:response.id
                    });

                        return {
                            id:response.id,
                            name:response.name,
                            email:credentials.username,
                            token:jwt
                        }
                }

                }catch(error){
                    toast({
                        title:"error",
                        variant:"destructive"
                    })
                    console.log("error while login", error);
                }
                
                

                try{
                    
                    const user= await prisma.user.create({
                        data:{
                            email:credentials.username,
                            password:credentials.password,
                            name:credentials.name
                        }
                    })

                    const jwt = generateToken({id:user.id});
                    
                    return {
                        id:user.id,
                        name:credentials.name,
                        email:credentials.username,
                        token:jwt
                    }

                }catch(error){
                    return null
                }
               
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    secret:process.env.NEXTAUTH_SECRET,
    callbacks:{
        session: ({session, token, user}:any)=>{
            const newSession: session = session as session
            if(newSession.user && token.uid){
                newSession.user.id = token.uid as string;
                newSession.user.jwtToken = token.jwtToken as string;
            }
            return newSession
        },
      jwt:({token , user}:any)=>{
        const newToken = token;
    
        if (user) {
          newToken.uid = user.id;
          newToken.jwtToken = (user as User).token;
        }
        return newToken;
      },
     
    }
}

async function generateToken(payload:JWTPayload){
    const secret  = process.env.JWT_SECRET || "secret";

    const jwk = await importJWK({k:secret , alg:"HS256", kty:"oct"});

    const jwt = await new SignJWT(payload)
    .setProtectedHeader({alg:"HS256"})
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(jwk)

    return jwt
    
}