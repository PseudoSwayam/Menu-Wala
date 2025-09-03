// src/hooks/useReports.ts

import { useState, useEffect } from 'react';
// CORRECT: Import the Firestore db instance and SDK functions
import { db } from '../config/firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { ServedItem, PopularItem } from '../types/Order';
import { format } from 'date-fns';

export const useServedItems = (date: string = format(new Date(), 'yyyy-MM-dd')) => {
  const [servedItems, setServedItems] = useState<ServedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // A reference to the collection for the specified date
    const collectionRef = collection(db, `reports/served-items/${date}`);
    // A query that gets all items from that collection, ordering them by revenue (highest first)
    const q = query(collectionRef, orderBy('totalRevenue', 'desc'));
    
    // onSnapshot sets up the real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // We map over the snapshot's documents to get our data
      const itemsArray = snapshot.docs.map(doc => doc.data() as ServedItem);
      setServedItems(itemsArray);
      setLoading(false);
    }, (error) => {
      console.error(`Error fetching served items for ${date}:`, error);
      setLoading(false);
    });

    // Cleanup the listener when the date changes or the component unmounts
    return () => unsubscribe();
  }, [date]);

  return { servedItems, loading };
};

export const usePopularItems = (date: string = format(new Date(), 'yyyy-MM-dd')) => {
  const [popularItems, setPopularItems] = useState<PopularItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionRef = collection(db, `reports/popular-items/${date}`);
    // A query that gets all items, ordering by order count (highest first)
    const q = query(collectionRef, orderBy('orderCount', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemsArray = snapshot.docs.map(doc => doc.data() as PopularItem);
      setPopularItems(itemsArray);
      setLoading(false);
    }, (error) => {
      console.error(`Error fetching popular items for ${date}:`, error);
      setLoading(false);
    });

    // Cleanup the listener
    return () => unsubscribe();
  }, [date]);

  return { popularItems, loading };
};