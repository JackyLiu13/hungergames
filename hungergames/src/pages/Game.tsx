import React, { useEffect, useState } from 'react';
import MobileFrame from '../components/MobileFrame';
import RestaurantCard from '@/components/RestaurantCard';
import './game.css'; // Import the CSS file for styling
import { useRestaurantsQueue } from '@/hooks';
import { useRouter } from 'next/router';

export type Restaurant = {
  gameId: number;
  restaurantId: number;
  name: string;
  address: string;
  rating: number;
  priceLevel: number;
  photo: string;
};

export const DEFAULT_RESTAURANT = {
  gameId: 0,
  restaurantId: 0,
  name: '',
  address: '',
  rating: 0,
  priceLevel: 0,
  photo: '/fries.png',
}

const Game: React.FC = () => {
  const router = useRouter();
  const { gameId, userId } = router.query; // Extract gameId from the query parameters

  const { getFrontTwo, enqueueMany, enqueue, removeFirstTwo, size } = useRestaurantsQueue([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (gameId && userId) {
        try {
          const baseUrl = `http://${process.env.NEXT_PUBLIC_API_IP}:${process.env.NEXT_PUBLIC_API_PORT}`;
          const response = await fetch(`${baseUrl}/restaurants/${gameId}`);
          const restaurantData = await response.json();
          enqueueMany(restaurantData);
        }
        catch (err) { console.log(err) }
        finally {
          setIsLoading(false);
        }
      }
    }

    fetchData();
  }, [gameId, userId]
  )

  const vote = async (restaurantId: number) => {
    try {
      const baseUrl = `http://${process.env.NEXT_PUBLIC_API_IP}:${process.env.NEXT_PUBLIC_API_PORT}`;
      const response = await fetch(`${baseUrl}/vote/${gameId}/${userId}/${restaurantId}`, {
        method: 'POST'
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const checkFinish = () => {
    if (size() === 2) {
      router.push('/wait');
    }
  }

  console.log(getFrontTwo())

  const firstResto = getFrontTwo()[0]
  const { name: firstName, priceLevel: firstPrice, rating: firstRating, photo: firstPhoto } = firstResto || DEFAULT_RESTAURANT

  const secondResto = getFrontTwo()[1]
  const { name: secondName, priceLevel: secondPrice, rating: secondRating, photo: secondPhoto } = secondResto || DEFAULT_RESTAURANT

  if (isLoading) {
    return (<div>Loading</div>)
  }

  return (
    <div className="mainPage">
      <MobileFrame>
        <div className='header'>
          <div className='headerTitle'>
            <h1>TAP TO PICK!</h1>
          </div>
        </div>
        <div className='cardContainer'>
          <div className='topCard' onClick={() => {
            vote(firstResto.restaurantId);
            enqueue(firstResto);
            removeFirstTwo();
            checkFinish();
          }}>
            <RestaurantCard
              restaurantName={firstName}
              price={firstPrice}
              rating={firstRating}
              imageUrl={firstPhoto}
            />
          </div>

          <div className='bottomCard' onClick={() => {
            vote(secondResto.restaurantId);
            enqueue(secondResto);
            removeFirstTwo();
            checkFinish();
          }}>
            <RestaurantCard
              restaurantName={secondName}
              price={secondPrice}
              rating={secondRating}
              imageUrl={secondPhoto}
            />
          </div>
        </div>
      </MobileFrame>
    </div>
  );
};

export default Game;