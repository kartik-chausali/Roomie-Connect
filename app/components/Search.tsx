
import SearchIcon from "../icons/roomSearch";
import Lottie from 'react-lottie'
import LoadingAnimation from '../icons/LoadingLottie.json'
import SearchBar from "./SearchBar";
export default function Search(){
    
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: LoadingAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    return <div className=" flex items-center justify-center">
        <div className="">
            <SearchIcon classname="h-1/2"/>
            <h1 className=" text-3xl  md:text-5xl flex flex-col items-center p-2 flex-wrap font-sans">Find compatible flatmates <span className="m-1">Rooms & PGs</span></h1>
            <SearchBar/>
           
        </div>
    </div>
}