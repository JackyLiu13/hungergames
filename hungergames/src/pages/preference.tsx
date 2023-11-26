'use client'

import React, { useState } from 'react';
import './preference.css'
import { useRouter } from 'next/router';

export default function Preference() {
  const router = useRouter();

  const [minPrice, setMinPrice] = useState<number>(1);
  const [maxPrice, setMaxPrice] = useState<number>(1);
  const [distance, setDistance] = useState<number>(10); // Default distance value


  const handlePriceLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(4, Math.max(0, Number(event.target.value)));
    setMaxPrice(newValue);
  };

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(Number(event.target.value));
  };

  const handleCreateLobby = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevent the default link click action

    try {
      // Generate gameId
      const gameResponse = await fetch(`http://${process.env.NEXT_PUBLIC_API_IP}:${process.env.NEXT_PUBLIC_API_PORT}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const gameId = await gameResponse.json();

      // Get latitude and longitude from the browser
      const apiKey = '6ca90725cc9a41afbeffbfd09ddda785';
      const locationResponse = await fetch(`https://api.geoapify.com/v1/ipinfo?&apiKey=${apiKey}`);
      const locationData = await locationResponse.json();
      let { latitude: lat, longitude: long } = locationData.location;
      if (!lat || !long) {
        console.log("Could not get location from browser, using default location instead");
        lat = 42.9926;
        long = -81.3322;
      }

      // Get restaurants from Google
      const baseUrl = `http://${process.env.NEXT_PUBLIC_API_IP}:${process.env.NEXT_PUBLIC_API_PORT}`;
      const response = await fetch(`${baseUrl}/restaurants/${gameId}?lat=${lat}&long=${long}&radius=${distance}&maxPrice=${maxPrice}`);
      const data = await response.json();
      console.log(data);

      // router.push(`/Game?gameId=${gameId}&userId=1`); // Redirect to the Game page with the gameId
      router.push(`/url?gameId=${gameId}&userId=1`); // Redirect to the URL page with the gameId
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="page">
      <div className="main">
        <div className="title">
          <h1>Select Your Preferences</h1>
        </div>

        <div className='Selection'>
          <div className="Selection1">
            <h3>Max Price Level</h3>
            <div className='editBox'>
              <div className="sliderBox">
                <div className="indicator">
                  <p className='distance'>{Array(maxPrice).fill('$').join('')}</p>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={maxPrice}
                  onChange={handlePriceLevelChange}
                  step="1"
                />
                <div className="sliderRow">
                  <p style={{ flex: 1, textAlign: 'left' }}>$</p>
                  <p style={{ flex: 1, textAlign: 'right' }}>$$$$</p>
                </div>
              </div>
            </div>

            <div className="Selection2">
              <h3>Max Distance</h3>
              <div className='editBox'>
                {/* Scrollable input range for distance */}
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={distance}
                  onChange={handleDistanceChange}
                  step="5" />
                <p className='distance'>{distance} KM</p>
              </div>
            </div>
          </div>

          <div>
            <button className="button" onClick={handleCreateLobby}>Create Lobby</button>
          </div>
        </div>
      </div>
    </div>
  );
}