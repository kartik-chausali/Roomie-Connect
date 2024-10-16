/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import AppBar from "./components/AppBar";
import Search from "./components/Search";
import Recomended from "./components/Recomended";
import Chat from "./components/Chat";

export default function Home() {
  return (
   
     <>
     <AppBar/>
     <Search/>
     <Recomended/>
     <Chat/>
     </>
  );
}
