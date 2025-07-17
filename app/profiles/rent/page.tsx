import { RoomWantedForm } from "@/components/ui/app-room-wanted-room-wanted-form";
import LocationComponent from '../../components/LocationDemo'
import React from "react";

export default function Home(){
    return <div className="text-white">
           <RoomWantedForm/>
           <LocationComponent/>
    </div>
}