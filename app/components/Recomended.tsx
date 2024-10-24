
import RecomendedIcon from "../icons/recomendedIcon";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Roomate from "./Roomate";
import Room from "./Room";


export default function Recomended(){
    // return <div className="flex flex-col items-center justify-center m-4 px-4 bg-white mx-auto my-auto w-full max-w-fit">
    //      <div className="flex items-center justify-center">
    //             <RecomendedIcon/>
    //            <span className="text-3xl mb-4 text-white">Recomended</span> 
    //      </div>
    //      <div className="flex items-center justify-center">
    //      <Tabs defaultValue="account" className="w-[400px]">
    //         <TabsList>
    //             <TabsTrigger value="room">Room</TabsTrigger>
    //             <TabsTrigger value="roomate">Roomate</TabsTrigger>
    //         </TabsList>
    //         <TabsContent value="room"><Room/></TabsContent>
    //         <TabsContent value="roomate"><Roomate/></TabsContent>
    //         </Tabs>
    //         </div>
    // </div>

    return  <div className=" mx-auto  w-full max-w-7xl px-3 xl:px-0 flex flex-col items-center justify-center mt-10">
        <h2 className="mx-auto max-w-5xl text-white text-center tracking-tight text-balance font-medium  text-3xl md:text-5xl md:leading-tight">Explore</h2>
        <h2 className="mx-auto my-4 max-w-4xl text-sm md:text-base text-balance text-neutral-500 text-center font-normal ">Explore according to your needs</h2>
    
            <Tabs defaultValue="account" className="w-[400px] mt-6 flex flex-col items-center justify-center">
             <TabsList >
                    <TabsTrigger value="room">Room</TabsTrigger>
                     <TabsTrigger value="roomate">Roomate</TabsTrigger>
                    </TabsList>
                 <TabsContent value="room"><Room/></TabsContent>
                 <TabsContent value="roomate"><Roomate/></TabsContent>
                </Tabs>
        
        </div>
    

    
}