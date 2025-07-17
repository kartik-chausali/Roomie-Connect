/* eslint-disable @typescript-eslint/no-unused-vars */

import SearchIcon from "../icons/roomSearch";
import Lottie from 'react-lottie'
import LoadingAnimation from '../icons/LoadingLottie.json'
import SearchBar from "./SearchBar";
import ListRoomCard from "./ListRoomCard";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-lines";
export default function Search(){
    
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: LoadingAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    return <div className=" flex flex-col items-center justify-center w-screen h-full">
        <div className="w-fit max-w-full">
           

      <BackgroundBeamsWithCollision className="">
            <h2 className="text-center text-3xl font-medium text-white dark:text-gray-50 md:text-6xl flex flex-col flex-wrap items-center mb-10">
               Find compatible Roomates ,{' '}
                <span className="text-center animate-text-gradient inline-flex bg-gradient-to-r from-white via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
                 PG's & Flats
                </span>
              </h2>
            

              <blockquote className="mt-6 border-l-2 pl-6 italic text-white text-center text-lg leading-6 dark:text-gray-200 ">
      "After all,  there's no better roomie than you. "
      <span className="cursor-wait opacity-70"> Roomie-connect</span> connects you with the right person
    </blockquote>
    </BackgroundBeamsWithCollision>
            <SearchBar/>
        </div>
        <ListRoomCard/>
    </div>
}