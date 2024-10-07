import CredentialsProvider  from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google'

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

                return {
                    id:"userid",
                    name:"kartik"
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
            return session
        }
    }
}