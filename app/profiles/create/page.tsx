/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import DeleteIcon from "@/app/icons/deleteIcon";
import Rupee from "@/app/icons/rupee";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'
import { toast } from "@/hooks/use-toast";
import {redirect} from 'next/navigation'
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
import { useSession } from "next-auth/react";
import prisma from "@/lib/singletonDb";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Label } from "@/components/ui/label"


  
export default function Home(){
   
    const[query, setQuery]  = useState("") 
    const[suggestions ,setSuggestions] = useState<suggestionsType[]>([]);
    const[badges, setBadges] = useState<string[]>([]);
    const imageRef = useRef<HTMLInputElement>(null);
    const session = useSession();
    const professionRef = useRef<HTMLInputElement>(null)
    const aboutRef = useRef<HTMLTextAreaElement>(null);
    const budgetRef = useRef<HTMLInputElement>(null);
    const[gender , setGender] = useState("")
    const[lookingFor , setLookingFor] = useState("");
    const[name, setName] = useState("")
    // console.log("session", session.data?.user?.id);

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

     async function handlePost(){
        if(badges.length==0 || imageRef.current?.files?.length == 0 || budgetRef.current?.value.length == 0 || professionRef.current?.value.length==0 || aboutRef.current?.value.length==0 || gender.length==0){
            toast({
        
                title:"Please fill all necessary details!",
                variant:"destructive",
              
            })
            return;
        }

        console.log("all details", badges, imageRef.current?.files, budgetRef.current?.value, professionRef.current?.value , aboutRef.current?.value , gender, name)

       const file =  imageRef.current?.files?.[0]
        if(!file){
            alert("Please select a file");
            return ;
        }

        const formData = new FormData();
        formData.append('file', file); // Append the file to FormData
        formData.append('fileName', file.name); // You can pass the file name as well
        formData.append('budget', budgetRef.current?.value || '');
       
        badges.forEach((location)=>{
            formData.append('locations', location)
        })

        formData.append('gender', gender);
        formData.append('lookingFor', lookingFor)
        formData.append('about', aboutRef.current?.value || '')
        formData.append('profession', professionRef.current?.value || '')
        formData.append('name', name)
        console.log("name",name)
        
        try{
           
            const response = await axios.post('/api/user/roomWanted', formData)
             
             toast({
                title:"Posted Successfully!",
                variant:"default"
             })
             redirect('/');
        }catch(error){
            if (error instanceof AxiosError && error.response) {
                toast({
                    title: `${error.response.data.msg}`,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "An unexpected error occurred",
                    variant: "destructive",
                });
            }
            console.log("Error while uploading image", error);
            }
          
  
    }


    return <div className="flex flex-col justify-center items-center w-screen bg-formBlack">
        <div className="flex flex-col p-4">
             <h1 className="text-4xl font-heading text-blue-700">Looking for a Room?</h1>
             <span className="font-serif text-gray-500">create your room wanted profile</span>
        </div>
       
        <div className="rounded-xl w-full md:w-1/2 p-4 h-full bg-formCard">
            <div className="flex flex-col flex-wrap ">
            <h1 className="text-lg md:text-2xl font-heading text-white">Looking for a Room?</h1>
            <span className="font-serif text-gray-500 m-3">Your Name</span>
            <Input type="text" placeholder="john doe..." value={name} onChange={(event)=> setName(event.target.value)} className=""/>
            <span className="font-serif text-gray-500 m-3">Search locations</span>
            <Input placeholder="Type to search..." className="" onChange={(event)=> setQuery(event.target.value)} value={query}/>
            {suggestions.length >0 && (<ul>
          {suggestions.map((city) => (
            <div key={city.name} onClick={()=> {
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
                   
                        <Badge key={badge} className="w-fit" icon={<DeleteIcon deleteItem={deleteBadge} badge={badge}/>}>{badge}</Badge>
                    
                ))}
              </div>
            )
        }
            </div>

           
        </div>
        
        <div className="rounded-md bg-white p-4 border m-8 w-full md:w-1/2">
            <h1 className="text-xl font-bold">About you</h1>
            
            <div className="m-4">

            <label className="font-semibold m-1 text-md">Budget</label>
           <div className="flex items-center">
            <Input icon={<Rupee/>} type="number" placeholder="" className="text-center w-full " required={true} ref={budgetRef}/>
            <span className="text-sm whitespace-nowrap">(*per month)</span>
            </div> 
            </div>

            <div className="m-4">

            <label className="font-semibold m-1 text-md">Looking for...</label>
            <Select onValueChange={(value)=> setLookingFor(value) }>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="For myself">For myself</SelectItem>
                <SelectItem value="As a couple">As a couple</SelectItem>
                <SelectItem value="As a group of friends">As a group of friends</SelectItem>
            </SelectContent>
            </Select>
            </div>

            <div className="m-4 ">

            <label className="font-semibold m-1 text-md">Gender</label>
            <Select onValueChange={(value)=> setGender(value)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
            </Select>
            </div>

            <div className="m-4">
                <label className="font-semibold m-1 text-md">Profession</label>
               <Input placeholder="eg. student , software engineer ..." ref={professionRef}/>

            </div>
            <div className="m-4">
                <label className="font-semibold m-1 text-md">Your photo</label>
                <input type="file" ref={imageRef}/>
            </div>
            
        </div>

        <div className="m-4 w-1/2">
        <Card>
            <CardHeader>
                <CardTitle>Your Socials</CardTitle>
                <CardDescription>(*optional)</CardDescription>
            </CardHeader>
            <CardContent className="">
            <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Instagram</Label>
              <Input id="name" placeholder="Your insta link" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Facebook</Label>
              <Input id="name" placeholder="Your Facebook link" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">X(formerly Twitter)</Label>
              <Input id="name" placeholder="Your X link" />
            </div>
            </div>
            </CardContent>
           
            </Card>

        </div>


        <div className="w-1/2 ">
        <label className="text-white">Pitch yourself about why you will be an ideal roomate</label>
        <Textarea className="" placeholder="Tell us a bit about yourself, your lifestyle, and what you're looking for in a room/roommate." ref={aboutRef} />
        </div>
        <Button className="w-1/3 m-4" onClick={handlePost}>Post</Button>
        
    </div>
}

