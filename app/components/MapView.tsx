// "use client"
// import React, { useEffect } from "react";
// import Map from 'ol/Map';
// import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
// import XYZ from 'ol/source/XYZ';
// import OSM from 'ol/source/OSM.js';

// export default function MapView({latitude , longitude}:{latitude:string , longitude:string}){
    
//     useEffect(() => {
//         const map = new Map({
//           target: "map",
//           layers: [
//             new TileLayer({
//               source: new OSM(),
//             }),
//           ],
//           view: new View({
//             center: [Number(latitude), Number(longitude)],
//             zoom: 2,
//           }),
//         });
    
//         return () => {
//           map.setTarget();
//         };
//       }, []);
//       return <div id="map" style={{width: "100%", height: "500px"}}/>;
// }

"use client"; 

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";

export default function MapView({ lat, lng }:{lat:number, lng:number}) {

  const [position , setPosition]= useState<LatLngExpression>([0,0]);
  
  useEffect(()=>{
    console.log(lat,lng)
    setPosition([lat, lng]);
  },[])

  useEffect(()=>{
    console.log(position)
  },[position])

  return (
    <MapContainer center={position} zoom={12} className="leaflet-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={position}>
        <Popup>User Location</Popup>
      </Marker>
    </MapContainer>
  );
}
