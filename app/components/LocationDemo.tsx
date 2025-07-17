"use client"
import React, { useState } from 'react';

interface Position{
  latitude: number,
  longitude:number
}
const GeolocationComponent = () => {
  const [position, setPosition] = useState<Position>({latitude:0,  longitude:0});
  const [error, setError] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition({ latitude, longitude });
          setError("");
        },
        (error) => {
          setError(error.message);
        },
        {
          enableHighAccuracy: true, // Requests GPS for high accuracy
          timeout: 10000,           // 10 seconds timeout to get location
          maximumAge: 0             // Forces the API to fetch new data
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Get Accurate Location</h2>
      <button onClick={getLocation}>Get Location</button>
      
      {position && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Latitude:</strong> {position.latitude}</p>
          <p><strong>Longitude:</strong> {position.longitude}</p>
        </div>
      )}
      
      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}
    </div>
  );
};

export default GeolocationComponent;
