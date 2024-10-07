/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import DeleteIcon from "@/app/icons/deleteIcon";
import Rupee from "@/app/icons/rupee";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea"

interface suggestionsType{
            id: number,
            wikiDataId: string,
            type: string,
            name: string,
            country: string,
            countryCode: string,
            region: string,
            regionCode:string,
            regionWdId: string,
            latitude: number,
            longitude: number,
            population: number

}

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button";

  
export default function Home(){
   
    const[query, setQuery]  = useState("") 
    const[suggestions ,setSuggestions] = useState<suggestionsType[]>([]);
    const[badges, setBadges] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const fetchSuggestions = async()=>{
      try{  
        const response = await axios.get(`http://geodb-free-service.wirefreethought.com/v1/geo/places?limit=5&offset=0&namePrefix=${query}`);
        setSuggestions(response.data.data);
        }catch(error){
            console.log(error)
        }
    }

   
    const deleteBadge = (badge:string)=>{
       const newBadges =  badges.filter((item)=> item !== badge);
       setBadges(newBadges);
    }
    console.log("badges", badges)
    useEffect(()=>{
        if(query.length>2){
            let timer = setTimeout(()=>{
                fetchSuggestions()
            },500)

            return ()=> clearTimeout(timer);
        }
    },[query])

    return <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col p-4">
             <h1 className="text-4xl font-heading text-blue-700">Looking for a Room?</h1>
             <span className="font-serif text-gray-500">create your room wanted profile</span>
        </div>
        
        <div className="rounded-md bg-white w-full md:w-1/3 p-4 h-full border border-b-appbar-border">
            <div className="flex flex-col flex-wrap">
            <h1 className="text-lg md:text-2xl font-heading">Looking for a Room?</h1>
            <span className="font-serif text-gray-500 m-3">Search locations</span>
            <Input placeholder="Type to search..." className="" onChange={(event)=> setQuery(event.target.value)} value={query}/>
            {suggestions.length >0 && (<ul>
          {suggestions.map((city) => (
            <div onClick={()=> {
                setBadges([...badges, `${city.name}, ${city.country}`] )
                setSuggestions([])
                setQuery("");
            }}>
                <li key={city.id} > {city.name}, {city.country}</li>
            </div>
          ))}
        </ul>)}
        {
            badges.length>0 && (
                <div className="grid grid-cols-2 p-2 ">
                {badges.map((badge)=>(
                   
                        <Badge className="w-fit" icon={<DeleteIcon deleteItem={deleteBadge} badge={badge}/>}>{badge}</Badge>
                    
                ))}
              </div>
            )
        }
            </div>

           
        </div>
        
        <div className="rounded-md bg-white p-4 border m-8 w-full md:w-1/4">
            <h1 className="text-xl font-bold">About you</h1>
            
            <div className="m-4">

            <label className="font-semibold m-1 text-md">Budget</label>
           <div className="flex items-center">
            <Input icon={<Rupee/>} type="number" placeholder="" className="text-center w-full " />
            <span className="text-sm whitespace-nowrap">(*per month)</span>
            </div> 
            </div>

            <div className="m-4">

            <label className="font-semibold m-1 text-md">Looking for...</label>
            <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">For myself</SelectItem>
                <SelectItem value="dark">As a couple</SelectItem>
                <SelectItem value="system">As a group of friends</SelectItem>
            </SelectContent>
            </Select>
            </div>

            <div className="m-4">

            <label className="font-semibold m-1 text-md">Gender</label>
            <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Female</SelectItem>
                <SelectItem value="dark">Male</SelectItem>
                <SelectItem value="system">Other</SelectItem>
            </SelectContent>
            </Select>
            </div>

            
        </div>

        <div className="w-1/2">
        <label>Pitch yourself about "why you will be an ideal roomate"</label>
        <Textarea className="" placeholder="I am very friendly and hygenic.."/>
        </div>

        <Button className="w-1/3 m-4">Post</Button>
    </div>
}

