import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Worker, Review, Booking, Offer } from '../types';
import { WORKERS as initialWorkers } from '../data/mockData';
import { useToast } from './ToastContext';

interface WorkerContextType {
  workers: Worker[];
  getWorkerById: (id: number) => Worker | undefined;
  addWorker: (worker: Omit<Worker, 'id' | 'distance'>) => void;
  updateWorker: (worker: Worker) => void;
  deleteWorker: (id: number) => void;
  addReview: (workerId: number, review: Omit<Review, 'id' | 'userImage'>) => void;
  favorites: number[];
  toggleFavorite: (workerId: number) => void;
  // Bookings
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'status'>) => void;
  cancelBooking: (id: number) => void;
  // Offers
  offers: Offer[];
  addOffer: (offer: Omit<Offer, 'id'>) => void;
  deleteOffer: (id: string) => void;
}

export const WorkerContext = createContext<WorkerContextType | undefined>(undefined);

const defaultWorker: Worker = {
  id: 0,
  name: 'N/A',
  age: 0,
  categoryId: 'unknown',
  categoryName: 'Unknown',
  experience: 0,
  rating: 0,
  reviewCount: 0,
  distance: 0,
  photo: '',
  verified: false,
  available: false,
  featured: false,
  city: 'N/A',
  latitude: 0,
  longitude: 0,
  serviceAreas: [],
  reviews: [],
  phone: '',
  bio: '',
  skills: [],
  badges: [],
};

export const WorkerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  
  // Workers State
  const [workers, setWorkers] = useState<Worker[]>(() => {
    try {
      const localData = localStorage.getItem('workers');
      if (localData) {
        const parsedData = JSON.parse(localData);
        if (Array.isArray(parsedData)) {
          const defaultWorkerShape = initialWorkers[0] || defaultWorker;
          return parsedData
            .filter(item => item && typeof item === 'object' && !Array.isArray(item))
            .map((worker: any) => ({
              ...defaultWorkerShape,
              ...worker,
              id: Number(worker.id || 0),
              latitude: Number(worker.latitude || defaultWorkerShape.latitude),
              longitude: Number(worker.longitude || defaultWorkerShape.longitude),
              rating: Number(worker.rating || 0),
              reviewCount: Number(worker.reviewCount || 0),
              experience: Number(worker.experience || 0),
              age: Number(worker.age || 0),
              reviews: Array.isArray(worker.reviews) ? worker.reviews : [],
              serviceAreas: Array.isArray(worker.serviceAreas) ? worker.serviceAreas : [],
              skills: Array.isArray(worker.skills) ? worker.skills : [],
              badges: Array.isArray(worker.badges) ? worker.badges : [],
            }));
        }
      }
      return initialWorkers;
    } catch (error) {
      console.error("Failed to parse workers from localStorage", error);
      return initialWorkers;
    }
  });

  // Favorites State
  const [favorites, setFavorites] = useState<number[]>(() => {
     try {
      const localFavorites = localStorage.getItem('favorites');
      return localFavorites ? JSON.parse(localFavorites) : [];
    } catch {
      return [];
    }
  });

  // Bookings State
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const localBookings = localStorage.getItem('bookings');
      return localBookings ? JSON.parse(localBookings) : [];
    } catch {
      return [];
    }
  });

  // Offers State
  const [offers, setOffers] = useState<Offer[]>(() => {
    try {
      const localOffers = localStorage.getItem('offers');
      return localOffers ? JSON.parse(localOffers) : [];
    } catch {
      return [];
    }
  });

  // Persist effects
  useEffect(() => localStorage.setItem('workers', JSON.stringify(workers)), [workers]);
  useEffect(() => localStorage.setItem('favorites', JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem('bookings', JSON.stringify(bookings)), [bookings]);
  useEffect(() => localStorage.setItem('offers', JSON.stringify(offers)), [offers]);

  // Worker Actions
  const getWorkerById = (id: number) => workers.find(w => w.id === id);

  const addWorker = (workerData: Omit<Worker, 'id'|'distance'>) => {
    const newWorker: Worker = {
      ...workerData,
      id: Date.now(),
      distance: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setWorkers(prev => [newWorker, ...prev]);
    showToast('Worker added successfully!', 'success');
  };

  const updateWorker = (updatedWorker: Worker) => {
    setWorkers(prev => prev.map(w => w.id === updatedWorker.id ? { ...updatedWorker, updatedAt: new Date().toISOString() } : w));
    showToast('Worker updated successfully!', 'success');
  };

  const deleteWorker = (id: number) => {
    if (window.confirm('Are you sure you want to delete this worker?')) {
        setWorkers(prev => prev.filter(w => w.id !== id));
        showToast('Worker deleted.', 'error');
    }
  };

  const addReview = (workerId: number, review: Omit<Review, 'id' | 'userImage'>) => {
    setWorkers(prevWorkers => 
      prevWorkers.map(worker => {
        if (worker.id === workerId) {
          const newReview: Review = {
            ...review,
            id: Date.now(),
            userImage: 'https://picsum.photos/id/100/50/50',
            date: new Date().toISOString()
          };
          const updatedReviews = [newReview, ...worker.reviews];
          const newAverageRating = updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
          return {
            ...worker,
            reviews: updatedReviews,
            reviewCount: updatedReviews.length,
            rating: parseFloat(newAverageRating.toFixed(1)),
          };
        }
        return worker;
      })
    );
  };

  const toggleFavorite = (workerId: number) => {
    setFavorites(prev => 
      prev.includes(workerId) ? prev.filter(id => id !== workerId) : [...prev, workerId]
    );
  };

  // Booking Actions
  const addBooking = (bookingData: Omit<Booking, 'id' | 'status'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now(),
      status: 'pending'
    };
    setBookings(prev => [newBooking, ...prev]);
    showToast('Booking request sent!', 'success');
  };

  const cancelBooking = (id: number) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
    showToast('Booking cancelled', 'info');
  };

  // Offer Actions
  const addOffer = (offerData: Omit<Offer, 'id'>) => {
    const newOffer: Offer = {
      ...offerData,
      id: Date.now().toString()
    };
    setOffers(prev => [...prev, newOffer]);
    showToast('Offer created', 'success');
  };

  const deleteOffer = (id: string) => {
    setOffers(prev => prev.filter(o => o.id !== id));
    showToast('Offer removed', 'info');
  };

  return (
    <WorkerContext.Provider value={{ 
      workers, getWorkerById, addWorker, updateWorker, deleteWorker, addReview, favorites, toggleFavorite,
      bookings, addBooking, cancelBooking,
      offers, addOffer, deleteOffer
    }}>
      {children}
    </WorkerContext.Provider>
  );
};