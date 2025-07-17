"use client"
import { Button } from "@/components/ui/button";
import GirlSearch from "../icons/GirlSearchIcon";
import {motion} from 'framer-motion'
import { useState } from "react";
import Link from "next/link";
import {CardDemo} from '../../components/ui/hover-efffect'
import { title } from "process";
export default function ListRoomCard(){
    

    return <div className="grid md:grid-cols-2 gap-8 sm:gap-24 w-fit max-w-full h-fit">
        <CardDemo title="Need a roomate?" description="Post about your room with photos along with what kind of roomate your are looking for!" buttonText="List your room" link="/profiles/rent" />
        <CardDemo title="Looking for a room?" description="Pitch yourself about why you will be an ideal roomate!" buttonText="Create your room wanted profile" link="/profiles/create"/>
    
        
    </div> 
     
}