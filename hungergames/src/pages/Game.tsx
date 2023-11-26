import React, { useEffect, useState } from 'react';
import MobileFrame from '../components/MobileFrame';
import RestaurantCard from '@/components/RestaurantCard';
import './game.css'; // Import the CSS file for styling
import Queue from './Queue';
import { useRestaurantsQueue } from '@/hooks';

export type Restaurant = {
  gameId: number;
  restaurantId: number;
  name: string;
  address: string;
  rating: number;
  priceLevel: number;
  photo: string;
};

const restaurantData = [
  {
    "gameId": 1,
    "restaurantId": 1,
    "name": "Subway",
    "address": "@, 941 Oxford St E, Quebec Street, London",
    "rating": 3.8,
    "priceLevel": 1,
    "photo": "https://lh3.googleusercontent.com/places/ANXAkqG2L54xCB8BCWBMDHvoQL9fQVbAfzfYJHv-zj7vZeRzFuHXBQA92n_-2FQxt8325vUe__6yEG9yo6GNt_aDq87N87xINtzn6lQ=s1600-h400"
  },
  {
    "gameId": 1,
    "restaurantId": 2,
    "name": "The Springs Restaurant",
    "address": "310 Springbank Drive, London",
    "rating": 4.6,
    "priceLevel": 3,
    "photo": "https://lh3.googleusercontent.com/places/ANXAkqFsYmyyLWe6EYPHZxTOfREXE7wQIhsHcncaAzQZ_036PGfpL7XBFKsXhMDDBU-JFJT9LDx9Ke41n_K8Ywk2Al30m1KAZdd2tHk=s1600-h400"
  },
  {
    "gameId": 1,
    "restaurantId": 3,
    "name": "Tim Hortons",
    "address": "111 Wharncliffe Road North, London",
    "rating": 3.7,
    "priceLevel": 1,
    "photo": "https://lh3.googleusercontent.com/places/ANXAkqFcHcqdLhV7x14xZhMJPRAaCSM-Qb6QgI3-nJ1G6HaHA3gVT3gV2KJiVXHRz6u13K0mUeZlAGBFzGJGaf3INUL8Sq5l_hhbriM=s1600-h400"
  },
  {
    "gameId": 1,
    "restaurantId": 4,
    "name": "Jack Astor's Bar & Grill Richmond Row",
    "address": "660 Richmond Street Unit #10, London",
    "rating": 3.9,
    "priceLevel": 2,
    "photo": "https://lh3.googleusercontent.com/places/ANXAkqGZTABH1pTpHLrh60M_RRouNmdPP52Aa3FsPy1f4BsLY_g1vwvBXxMRfGZnoZsvqufRfUj-Q-n5WlzgOuUXwyBnmKXNyfvQi7c=s1600-h400"
  }
];

export const DEFAULT_RESTAURANT = {
  gameId: 0,
  restaurantId: 0,
  name: '',
  address: '',
  rating: 0,
  priceLevel: 0,
  photo: '/fries.png',
}

const gameId = 1; // Hardcoded game ID
const restaurantQueue = new Queue<Restaurant>();

restaurantData
  .filter((restaurant) => restaurant.gameId === gameId)
  .forEach((restaurant) => {
    restaurantQueue.enqueue(restaurant);
  });

console.log(restaurantQueue.getItems()); // Add a getItems() method in your Queue class to retrieve the items



const Game: React.FC = () => {
  const [restaurants, setRestaurants] = useState(restaurantData);
  const { getFrontTwo, enqueueMany, enqueue, size, removeFirstTwo } = useRestaurantsQueue([])
  const [isLoading, setIsLoading] = useState(true);


  //GET restaurant (dictionary) -> queue -> randomize order
  //queue is restaurants FIFO
  //START
  //Grab 2 from head
  //draw 2
  //Selection handler, *note we are not keeping track of rounds*
  //POST to DB to tally aka VOTE && requeue
  //go back to START until 1 element left

  //once 1 element left -> list view

  // Ennqueue some restaurants

  // Grab the two options
  const [choiceA, setChoiceA] = React.useState<Restaurant>({
    gameId: 0,
    restaurantId: 0,
    name: '',
    address: '',
    rating: 0,
    priceLevel: 0,
    photo: '',
  });

  const [choiceB, setChoiceB] = React.useState<Restaurant>({
    gameId: 0,
    restaurantId: 0,
    name: '',
    address: '',
    rating: 0,
    priceLevel: 0,
    photo: '',
  });

  const dequeueRestaurants = () => {
    const newA = restaurantQueue.dequeue();
    const newB = restaurantQueue.dequeue();

    console.log(restaurantQueue.getItems()); // Add a getItems() method in your Queue class to retrieve the items


    setChoiceA(newA || {
      gameId: 0,
      restaurantId: 0,
      name: '',
      address: '',
      rating: 0,
      priceLevel: 0,
      photo: '/fries.png',
    });
    setChoiceB(newB || {
      gameId: 0,
      restaurantId: 0,
      name: '',
      address: '',
      rating: 0,
      priceLevel: 0,
      photo: '/fries.png',
    });

  };

  const enqueueRestaurant = (restaurantName: Restaurant) => {
    restaurantQueue.enqueue(restaurantName);
  };

  // Use useEffect to dequeue restaurants when the component is mounted
  // useEffect(() => {
  // dequeueRestaurants();
  // }, []); 

  useEffect(() => {

    async function fetchData() {

      try {
        await setTimeout(() => {
          console.log("data fetched");
          enqueueMany(restaurantData);
        }, 1000);

      }
      catch (err) { console.log(err) }
      finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []
  )

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
          <h1>SWIPE TO PICK!</h1>
        </div>
        <div className='cardContainer'>
          <div className='topCard' onClick={() => { enqueue(firstResto); removeFirstTwo(); }}>
            <RestaurantCard
              restaurantName={firstName}
              price={firstPrice}
              rating={firstRating}
              imageUrl={firstPhoto}
            />
          </div>

          <div className='bottomCard' onClick={() => { enqueue(secondResto); removeFirstTwo(); }}>
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