"use client"
import React, { useEffect } from "react";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM.js';

export default function MapView(){
    
    useEffect(() => {
        const map = new Map({
          target: "map",
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: [0, 0],
            zoom: 2,
          }),
        });
    
        return () => {
          map.setTarget();
        };
      }, []);
      return <div id="map" style={{width: "100%", height: "400px"}}/>;
}