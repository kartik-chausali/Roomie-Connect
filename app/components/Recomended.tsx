
import RecomendedIcon from "../icons/recomendedIcon";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Roomate from "./Roomate";
import Room, { RoomProp } from "./Room";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import Link from "next/link";


interface postInputs{
    locations:string[],
    lookingFor:string,
    budget:string,
    gender:string, 
    name:string,
    about:string,
    profession:string
    image:string
}


async function getRoomates(){
    const response = await axios.get('http://localhost:3000/api/user/roomWanted');
    return response.data;
}

async function getRoomPosts(){
    const response = await axios.get('http://localhost:3000/api/user/listRoom');
    return response
}
export default async function Recomended(){
  
    const roomMatePosts = await getRoomates();
    const roomPosts = await getRoomPosts();
    
    return  <div className=" mx-auto  w-full max-w-7xl px-3 xl:px-0 flex flex-col items-center justify-center mt-10">
        <h2 className="mx-auto max-w-5xl text-white text-center tracking-tight text-balance font-medium  text-3xl md:text-5xl md:leading-tight">Explore</h2>
        <h2 className="mx-auto my-4 max-w-4xl text-sm md:text-base text-balance text-neutral-500 text-center font-normal ">Explore according to your needs</h2>
    
            <Tabs defaultValue="account" className="w-[400px] mt-6 flex flex-col items-center justify-center">
             <TabsList >
                    <TabsTrigger value="room">Room</TabsTrigger>
                     <TabsTrigger value="roomate">Roomate</TabsTrigger>
                    </TabsList>
                 <TabsContent value="room">
                    {roomPosts.data.posts.map((post: RoomProp)=>{
                        return <Link id={post.id} href={`/room/${post.id}`}>
                        <Room id={post.id} roomType={post.roomType} images={post.images} location={post.location} latitude={post.latitude} longitude={post.longitude} propertyName={post.propertyName} rent={post.rent} about={post.about}/>
                        </Link>
                    })}
                 </TabsContent>
                 <TabsContent value="roomate">
                   {roomMatePosts.data.map((post: postInputs)=>{
                    return <Roomate key={post.name} name={post.name} image={post.image} profession={post.profession} about={post.about} gender={post.gender} lookingFor={post.lookingFor} locations={post.locations} budget={post.budget}/>
                   })}

                    </TabsContent>
                </Tabs>
        
        </div>
    

    
}