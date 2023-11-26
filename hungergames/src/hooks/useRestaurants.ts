import { Restaurant } from "@/pages/Game";
import { useState } from "react";

export const useRestaurantsQueue = (init: Restaurant[]) => {
  const [items, setItems] = useState<Restaurant[] | []>(init);

  console.log("USE RESTAURANTS QUEUE", items);

  const enqueue = (restaurant: Restaurant) => {
    setItems([...items, restaurant]);
  };

  const enqueueMany = (restaurants: Restaurant[]) => {
    setItems([...items, ...restaurants]);
  };

  const dequeue = () => {
    const [firstItem, ...rest] = items;
    setItems(rest);
    return firstItem;
  };

  const front = () => {
    return items[0];
  };

  const isEmpty = () => {
    return items.length === 0;
  };

  const size = () => {
    return items.length;
  };

  const getItems = () => {
    return [...items];
  };

  const getFrontTwo = () => {
    return [items[0], items[1]];
  };

  const removeFirstTwo = () => {
    dequeue();
    dequeue();
  };

  // You can expose the necessary methods or state here
  return {
    enqueue,
    dequeue,
    front,
    isEmpty,
    size,
    getItems,
    getFrontTwo,
    removeFirstTwo,
    enqueueMany,
  };
};
