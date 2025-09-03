// src/hooks/useNotifications.ts

import { useEffect, useRef } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import toast from 'react-hot-toast';

export const useNotifications = () => {
  // We use a ref to prevent notifications for orders that already exist when the app first loads.
  const isInitialLoad = useRef(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element just once
    if (!audioRef.current) {
      audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp6KNZFApGn+DyvmAaA0OX2fi0dS8FIXnK8N2QQAoUXrTp6KFaFAlFnt-1wmMaA0OX2vi0dS8GIHjJ8N-QQAoVXrTp6J5aEwlFnt-1wmMaA0OX2vi0dS8GIHjJ8N-QQAo');
    }

    // This query looks for new documents added to the 'orders' collection
    // that have the status 'pending'. This is the perfect trigger for a notification.
    const q = query(collection(db, "orders"), where("status", "==", "pending"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // On the very first load, we don't want to show notifications for all existing orders.
      // We set the flag to false and return early.
      if (isInitialLoad.current) {
        isInitialLoad.current = false;
        return;
      }

      // docChanges() is the magic. It gives us an array of ONLY the documents
      // that were added, modified, or removed since the last update.
      snapshot.docChanges().forEach((change) => {
        // We only care about newly added documents for our notification.
        if (change.type === "added") {
          const order = change.doc.data();

          // Play notification sound
          audioRef.current?.play().catch(console.error);

          // THE FIX IS HERE:
          // We change 'order.table_id' to 'order.tableNumber' to match the correct Order type.
          toast.success(`New order from Table ${order.tableNumber}!`, {
            duration: 5000,
            position: 'top-center',
            style: {
              background: '#059669',
              color: 'white',
              fontWeight: 'bold',
            },
          });
        }
      });
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []); // The empty dependency array ensures this effect runs only once.
};