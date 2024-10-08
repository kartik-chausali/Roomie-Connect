/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button"
import {signIn, signOut} from 'next-auth/react'
import roomate from '../icons/roommate.png'

  import Link from 'next/link'
import Features from "./Features";
import Navigation from "./Navigation";
export default function AppBar(){
    return <div className="flex justify-center items-center">
        <div className="flex flex-wrap gap-2  justify-center items-center border border-appbar-border shadow-lg rounded-lg w-fit p-2 m-2">
            <div className="flex items-center">
            <Image src={roomate} alt="room" className="h-10 w-10 rounded-lg"/>
            <span className=" font-semibold font-sans text-xs sm:text-lg">Roomie<span className="text-logo-color-green">Connect</span></span>
            </div>
            <Navigation/>
    <Link href="https://github.com/kartik-chausali/Roomie-Connect" className="text-nav-default md:flex items-center hidden">Contribute <svg xmlns="http://www.w3.org/2000/svg" className="bg-white h-5 w-5 rounded-full" xmlSpace="preserve" viewBox="0 0 16 16" id="github">
  <path d="M7.999 0C3.582 0 0 3.596 0 8.032a8.031 8.031 0 0 0 5.472 7.621c.4.074.546-.174.546-.387 0-.191-.007-.696-.011-1.366-2.225.485-2.695-1.077-2.695-1.077-.363-.928-.888-1.175-.888-1.175-.727-.498.054-.488.054-.488.803.057 1.225.828 1.225.828.714 1.227 1.873.873 2.329.667.072-.519.279-.873.508-1.074-1.776-.203-3.644-.892-3.644-3.969 0-.877.312-1.594.824-2.156-.083-.203-.357-1.02.078-2.125 0 0 .672-.216 2.2.823a7.633 7.633 0 0 1 2.003-.27 7.65 7.65 0 0 1 2.003.271c1.527-1.039 2.198-.823 2.198-.823.436 1.106.162 1.922.08 2.125.513.562.822 1.279.822 2.156 0 3.085-1.87 3.764-3.652 3.963.287.248.543.738.543 1.487 0 1.074-.01 1.94-.01 2.203 0 .215.144.465.55.386A8.032 8.032 0 0 0 16 8.032C16 3.596 12.418 0 7.999 0z"></path>
</svg>
</Link>
    <Link onClick={()=>signIn()} href="" className={buttonVariants({variant:"login", className:"text-xs"})}>Login</Link>
    <Link href="" className={buttonVariants({variant:"outline"})}>SignUp</Link>
        </div>
    </div>
}