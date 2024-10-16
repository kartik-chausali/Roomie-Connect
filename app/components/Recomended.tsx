
import RecomendedIcon from "../icons/recomendedIcon";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Roomate from "./Roomate";
import Room from "./Room";


export default function Recomended(){
    return <div className="flex flex-col items-center justify-center m-4 px-4 bg-white mx-auto my-auto w-full max-w-fit">
         <div className="flex items-center justify-center">
                <RecomendedIcon/>
               <span className="text-3xl mb-4 text-white">Recomended</span> 
         </div>
         <div className="flex items-center justify-center">
         <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="room">Room</TabsTrigger>
                <TabsTrigger value="roomate">Roomate</TabsTrigger>
            </TabsList>
            <TabsContent value="room"><Room/></TabsContent>
            <TabsContent value="roomate"><Roomate/></TabsContent>
            </Tabs>
            </div>
    </div>
}