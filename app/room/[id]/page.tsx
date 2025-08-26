"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Mail, User, Home, DollarSign, IndianRupeeIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { useSession } from "next-auth/react"
import { RoomProp } from "@/app/components/Room"
import MapView from "@/app/components/MapView"

type RoomPageProp= {
    params:{
        id:string;
    }
}   

// async function getRoomDetail(id:string) {
//     const response = await axios.get(`http://localhost:3000/api/user/listRoom/${id}`)
//     return response
// }
export default  function RoomPage({params}:RoomPageProp){
    const {id} = params; 

    const [currentImageIndex, setCurrentImageIndex] = useState(0)   
    const [roomData , setRoomData] = useState<RoomProp>({
        images: [],
        propertyName:'',
        owner:'',
        email:'',
        rent:0,
        roomType:'',
        location:'',
        about:'',
        latitude:'',
        longitude:'',
        id:''
});
    
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === roomData.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? roomData.images.length - 1 : prev - 1))
  }


    useEffect(()=>{
        (async ()=>{
            const response = await axios.get(`http://localhost:3000/api/user/listRoom/${id}`)
            setRoomData(response.data.room);
        })();
    },[])

    return  <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{roomData.propertyName}</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{roomData.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Images and Details */}
          <div className="space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={roomData.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`Room image ${currentImageIndex + 1}`}
                    className="w-full h-80 md:h-96 object-cover rounded-t-lg"
                  />
                  {roomData.images.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                        {roomData.images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? "bg-primary" : "bg-background/60"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Room Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Room Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Room Type</p>
                    <Badge variant="secondary">{roomData.roomType}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Rent</p>
                    <div className="flex items-center gap-1">
                      <IndianRupeeIcon className="h-4 w-4 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">{roomData.rent}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">About this room</p>
                  <p className="text-foreground leading-relaxed">{roomData.about}</p>
                </div>
              </CardContent>
            </Card>

            {/* Owner Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Owner Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Owner</p>
                  <p className="font-medium">{roomData.owner}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact Email</p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${roomData.email}`} className="text-primary hover:underline">
                      {roomData.email}
                    </a>
                  </div>
                </div>
                <Button className="w-full mt-4">Contact Owner</Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Map */}
          <div className="space-y-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 lg:h-full min-h-96 bg-muted rounded-b-lg relative overflow-hidden">
                  {/* Simple map placeholder - replace with actual map component */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900">
                    <div className="text-center space-y-2">
                      <MapPin className="h-12 w-12 mx-auto text-primary" />
                      <div className="space-y-1">
                        <p className="font-medium">Map View</p>
                        <MapView lat={roomData.latitude == '' ? 0 : Number(roomData.latitude)} lng={roomData.longitude == '' ? 0 : Number(roomData.longitude)}/>
                        <p className="text-sm text-muted-foreground">
                          Lat: {roomData.latitude}, Lng: {roomData.longitude}
                        </p>
                        <p className="text-xs text-muted-foreground max-w-xs">{roomData.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive map would go here */}
                  {/* You can integrate with Google Maps, Mapbox, or Leaflet */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Send Inquiry
          </Button>
          <Button variant="outline" size="lg">
            Save to Favorites
          </Button>
          <Button variant="outline" size="lg">
            Share Listing
          </Button>
        </div>
      </div>
    </div>
}