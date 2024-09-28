"use client"

import { useEffect, useRef, useState } from "react"
import {motion} from 'framer-motion'
import { Input } from "@/components/ui/input";
import SearchLocationIcon from "../icons/searchLocationIcon";
export default function SearchBar(){
    const [isExpanded, setExpanded] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleExpand = () => {
        setExpanded(true)
      }

    function handleCollapse(){
        setExpanded(false);
    }

      

    return <div className="flex justify-center items-center">
            <motion.div initial={{ width: "200px", height: "40px", y: 0 }} 
            animate={{
                width: isExpanded ? "400px" : "300px",
                height: isExpanded ? "60px" : "50px",
                y: isExpanded ? -10 : 0
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative">
                <Input icon={<SearchLocationIcon/>} placeholder="Search Places..." ref={inputRef} onClick={handleExpand} onBlur={handleCollapse} 
                className={`w-full h-full px-4 text-center rounded-lg bg-searchBar-background transition-all duration-300 ease-out ${
                    isExpanded ? 'text-lg' : 'text-base'
                  }`}/>

            </motion.div>
    </div>
}