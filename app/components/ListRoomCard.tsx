"use client"
import { Button } from "@/components/ui/button";
import GirlSearch from "../icons/GirlSearchIcon";
import {motion} from 'framer-motion'
import { useState } from "react";
import Link from "next/link";

export default function ListRoomCard(){
        const [hoverOne , setHoverOne] = useState(false);
        const [hoverTwo , setHoverTwo] = useState(false);

        function handleHover(){
            setHoverOne(true);
        }
        function handleHoverOut(){
            setHoverOne(false);
        }

        function handleHoverTwo(){
            setHoverTwo(true);
        }
        function handleHoverTwoOut(){
            setHoverTwo(false);
        }
    return <div className="grid md:grid-cols-2 gap-8 sm:gap-4 w-fit max-w-full h-fit">
        <div className="rounded-md flex items-center justify-between border w-full h-full bg-searchBar-background p-2" onMouseOver={handleHover} onMouseOut={handleHoverOut}>

            <div className="flex flex-col justify-between h-full">

            <span className="flex-1 flex items-center justify-center font-heading text-xl">Need a roomate?</span>
            <Button className="mt-auto">List your room </Button>
            </div>
            <motion.div animate={{
                            y: hoverOne ? -10 : 0
                        }}>
            <GirlSearch/>
            </motion.div>
        </div>

        <div className="bg-searchBar-background rounded-md w-full flex items-center justify-between border p-2" onMouseOver={handleHoverTwo} onMouseOut={handleHoverTwoOut}>
                <div className="flex flex-col justify-between h-full">
                    <span className="flex-1 flex justify-center items-center font-heading text-xl">Looking for a room?</span>
                    <Link href={'/profiles/create'}>
                    <Button className="mt-auto">Create your profile</Button>
                    </Link>
                </div>

                <motion.div animate={{
                            y: hoverTwo ? -10 : 0
                        }}>
                <GirlSearch/>
            </motion.div>
                
        </div>

        
    </div> 
     
}