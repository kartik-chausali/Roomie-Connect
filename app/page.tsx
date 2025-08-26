/* eslint-disable @typescript-eslint/no-unused-vars */

import AppBar from "./components/AppBar";
import Search from "./components/Search";
import Recomended from "./components/Recomended";
import Chat from "./components/Chat";
import MapView from './components/MapView'
export default async function Home() {
 
  return (
   
     <>
     <AppBar/>
     <Search/>
     <Recomended/>
     <Chat/>
     </>
  );
}
