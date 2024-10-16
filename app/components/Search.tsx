/* eslint-disable @typescript-eslint/no-unused-vars */

import SearchIcon from "../icons/roomSearch";
import Lottie from 'react-lottie'
import LoadingAnimation from '../icons/LoadingLottie.json'
import SearchBar from "./SearchBar";
import ListRoomCard from "./ListRoomCard";
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
            {/* <SearchIcon classname="h-1/2 mt-10 opacity-60"/> */}
            {/* <h1 className=" text-white text-3xl  md:text-7xl flex flex-col items-center p-2 flex-wrap font-heading">Find compatible flatmates <span className="m-1">Rooms & PGs</span></h1> */}
            <h2 className="text-center text-3xl font-medium text-white dark:text-gray-50 sm:text-6xl flex flex-col flex-wrap items-center mb-10">
               Find compatible Roomates ,{' '}
                <span className="text-center animate-text-gradient inline-flex bg-gradient-to-r from-white via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
                 PG's & Flats
                </span>
              </h2>
              {/* <p className="mt-6 text-center text-lg leading-6 text-white dark:text-gray-200 mb-6">
               Looking for a room or roomate in a new city?{' '}
                <span className="cursor-wait opacity-70">Roomie-connect</span> connects you with the right person
              </p> */}

              <blockquote className="mt-6 border-l-2 pl-6 italic text-white text-center text-lg leading-6 dark:text-gray-200 mb-6">
      "After all,  there's no better roomie than you. "
      <span className="cursor-wait opacity-70"> Roomie-connect</span> connects you with the right person
    </blockquote>
            <SearchBar/>
        </div>
        <ListRoomCard/>
    </div>
}