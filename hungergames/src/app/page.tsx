'use client'

import React, { useState } from 'react';
import './main.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// ... (existing imports)

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const inputElement = document.getElementById('userInput') as HTMLInputElement;
  if (inputElement) {
    // Set the text color to red
    inputElement.style.color = 'black';
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // // Fetch API
  // const createNewGame = async (event: { preventDefault: () => void; }) => {
  //   event.preventDefault(); // Prevent the default link click action

  //   try {
  //     const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_IP}:${process.env.NEXT_PUBLIC_API_PORT}/games`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     });
  //     const data = await response.json();
  //     console.log(data);

  //     router.push(`/url?gameId=${data}&userId=1`); // Redirect to the URL page with the gameId
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

    return (
    <div className="main">
      <div className="title">
        <img className="hunger" src="/title.svg" alt="title text" />
        {/* <img className="game" src="/title/game_text.svg" alt="game text"/> */}
      </div>
      <div className="userZone">
        <input
          className="userInput"
          type="text"
          id="userInput"
          value={inputValue}
          placeholder='Enter your Game PIN Number'
          onChange={handleInputChange}
        />
        <div>
          {/* Attach the event listener to the button click */}
          <button id="enterGame" className="button" onClick={handleEnterGameClick}>
            ENTER GAME
          </button>
        </div>
        <Link href="/preference"><p className="newGame">Create New Game</p></Link>
        {/* <Link href="/url" onClick={createNewGame}><p className="newGame">Create New Game</p></Link> */}
      </div>
      <div className="foodImage">
        <div className='food'>
          <img className="foodImage1" src="/fries.png" alt="fries" />
        </div>
        <div className='food'>
          <img className="foodImage2" src="/noodle.png" alt="fries" />
        </div>
      </div>



      <div className="bottom">
        <img className="hand" src="/Hand.png" alt="hand" />
      </div>


    </div>

  )
}