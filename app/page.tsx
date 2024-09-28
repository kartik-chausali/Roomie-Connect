/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import AppBar from "./components/AppBar";
import Search from "./components/Search";

export default function Home() {
  return (
    <div className="">
     <AppBar/>
     <Search/>
    </div>
  );
}
