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
            <SearchIcon classname="h-1/2"/>
            <h1 className=" text-3xl  md:text-5xl flex flex-col items-center p-2 flex-wrap font-heading">Find compatible flatmates <span className="m-1">Rooms & PGs</span></h1>
            <SearchBar/>
        </div>
        <ListRoomCard/>
    </div>
}