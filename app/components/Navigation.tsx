/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  import Image from "next/image";
  import Link from 'next/link'
import Features from "./Features"
import roomate from '../icons/roommate.png'
import React from "react";
import { cn } from "@/lib/utils";
import MapIcon from "../icons/mapIcon";
import LocationIcon from "../icons/locationIcon";
import ChatIcon from "../icons/chatIcon";
import SearchIcon from "../icons/roomSearch";
export default function Navigation(){
    
    return (<NavigationMenu>
    <NavigationMenuList>
  
      <NavigationMenuItem>
        <NavigationMenuTrigger className="text-nav-default">Features</NavigationMenuTrigger>
        <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            {/* <div className="flex"> */}

           
          <li className="row-span-3 p-2">
             <NavigationMenuLink asChild>
             <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md" href="/">
                
            {/* <Image src = {roomate} alt="logo"/> */}
            <SearchIcon/>
             <div className="mb-2 mt-4 text-lg font-medium">
                     Looking For a RoomMate?
            </div>

            <p className="text-sm leading-tight text-muted-foreground">
                      Post Here
             </p>

         </a>
                
            </NavigationMenuLink>
          </li>

          <li className="row-span-3 p-2">
            <NavigationMenuLink asChild>
            <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md" href="/">
                
                <Image src = {roomate} alt="logo"/>
                 <div className="mb-2 mt-4 text-lg font-medium">
                         Looking For a Room?
                </div>
    
                <p className="text-sm leading-tight text-muted-foreground">
                          Search Here
                 </p>
    
             </a>
            </NavigationMenuLink>
          </li>
          {/* <div className="flex flex-col "> */}
          <ListItem href="/" title="Map View" icon={<MapIcon/>}>Check Map View and Location of the room </ListItem>
          <ListItem href="/" title="Nearest to your Location" icon={<LocationIcon/>}>Find Rooms Nearest to your Location</ListItem>
          <ListItem href="/" title="Chat Support" icon={<ChatIcon/>}>Chat with others to finalize the deal</ListItem>
        {/* </div>
        </div> */}

          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
  
     <NavigationMenuItem>
      <NavigationMenuTrigger className="text-nav-default">
          Contact
      </NavigationMenuTrigger>
     </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>)
}
interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
    title:string, 
    icon?: React.ReactNode;
}
const ListItem = React.forwardRef<React.ElementRef<"a"> , ListItemProps >( ( props , ref ) => {
    const {className, children, title, icon} = props;
    return (<li>
        <NavigationMenuLink asChild>
            <a ref={ref} className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}>
             <div className="text-sm font-medium leading-none flex items-center">{title} {icon && <span>{icon}</span>}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
            </a>
        </NavigationMenuLink>
    </li>)
} )

ListItem.displayName = "ListItem"