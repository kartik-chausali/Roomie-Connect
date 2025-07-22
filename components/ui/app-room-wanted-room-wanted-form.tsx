/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ImageUpload } from './app-room-wanted-image-upload'
import { CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL } from 'next/dist/shared/lib/constants'
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { redirect } from 'next/navigation'

export interface InputData{
  images: File[],
  propertyName: string,
  owner: string,
  email: string,
  rent: number,
  roomType: string,
  location: string,
  about: string,
}
export function RoomWantedForm() {
  // const [images, setImages] = useState<string[]>([])
  const [inputData , setInputData] = useState<InputData>({
    images: [],
    propertyName:'',
    owner:'',
    email:'',
    rent:0,
    roomType:'',
    location:'',
    about:''
  })
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Here you would typically send the form data to your backend
    
    const formData = new FormData();
     if(!inputData.images){
            alert("Please select a file");
            return ;
        }
      inputData.images.forEach((file)=>{
        console.log("on frontend" , file );
        formData.append(`image` , file);
        formData.append('fileName' , file.name);
      })
      formData.append('propertyName' , inputData.propertyName);
      formData.append('owner' , inputData.owner);
      formData.append('email' , inputData.email)
      formData.append('rent' , inputData.rent+'')
      formData.append('roomType' , inputData.roomType)
      formData.append('location' , inputData.location)
      formData.append('about' , inputData.about || "" )
      
      try{

        const response = await axios.post('/api/user/listRoom', formData)
             
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
 
    return (
    <div className='flex flex-col justify-center items-center mt-4'>
      <h1 className='text-white'>List your Room in minutes!<span>Fill out below form for details</span></h1>
    <Card className='w-1/2 p-2'>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Property Name</Label>
            <Input id="name" required value={inputData.propertyName} onChange={(e)=> setInputData( (prev) => ({...prev , propertyName: e.target.value}))}/>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Owner Name</Label>
            <Input id="name" required value={inputData.owner} onChange={ (e)=>setInputData( (prev)=> ({...prev , owner:e.target.value}))}/>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Contact Email</Label>
            <Input id="email" type="email" required value={inputData.email} onChange={(e)=> setInputData((prev) => ({...prev , email:e.target.value}))} />
          </div>


          <div className="space-y-2">
            <Label htmlFor="budget">Monthly Rent</Label>
            <Input id="budget" type="number" min="0" step="100" required  value={inputData.rent} onChange={(e)=> setInputData((prev)=> ({...prev , rent: +e.target.value}))}/>
          </div>


          <div className="space-y-2">
            <Label htmlFor="room-type"> Room Type</Label>
            <Select required onValueChange={(value)=> setInputData((prev)=> ({...prev , roomType:value}))}>
              <SelectTrigger>
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Room</SelectItem>
                <SelectItem value="shared">Shared Room</SelectItem>
                <SelectItem value="studio">Studio Apartment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferred-areas">Property Location</Label>
            <Input id="preferred-areas" placeholder="e.g. Downtown, West End"  value={inputData.location} onChange={(e) => setInputData((prev)=> ({...prev , location:e.target.value}))}/>
          </div>

          <div className="space-y-2">
            <Label htmlFor="about">About You</Label>
            <Textarea id="about" placeholder="Tell us a bit about what you're looking for in roomate/tenant" value={inputData.about} onChange={(e) => setInputData((prev)=> ({...prev , about:e.target.value}))}/>
          </div>

          <div className="space-y-2">
            <Label>Upload Images</Label>
            <ImageUpload images={inputData.images} setInputData={setInputData} />
          </div>

          <Button type="submit" className="w-full">Submit Room Wanted Ad</Button>
        </form>
      </CardContent>
    </Card>
    </div>
  )
}