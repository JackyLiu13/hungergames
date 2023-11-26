import React, { useState, useEffect } from 'react';
import './wait.css';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Wait() {
  const [isResultReady, setIsResultReady] = useState(true);

  // useEffect(() => {
  //   // Fetch the backend boolean value
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/api/your-endpoint'); // Replace with your actual API endpoint
  //       const data = await response.json();
  //       setIsResultReady(data.isResultReady); // Assuming your backend returns { "isResultReady": true/false }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []); // Run once when the component mounts

  const router = useRouter();
  const { gameId, userId } = router.query; // Extract gameId from the query parameters

  return (
    <div className="page">
      <div className="main">
        <div className="title">
          <h1>
            Waiting <br />
            for <br />
            everyone <br />
            to finish
          </h1>

          {isResultReady && (
            <Link href={`/ranking?gameId=${gameId}&userId=${userId}`}>
              <button className="button">Check result</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
