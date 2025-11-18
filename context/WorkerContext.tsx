import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Worker, Review } from '../types';
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
}

export const WorkerContext = createContext<WorkerContextType | undefined>(undefined);

export const WorkerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [workers, setWorkers] = useState<Worker[]>(() => {
    try {
      const localWorkers = localStorage.getItem('workers');
      return localWorkers ? JSON.parse(localWorkers) : initialWorkers;
    } catch (error) {
      console.error("Failed to parse workers from localStorage", error);
      return initialWorkers;
    }
  });

  const [favorites, setFavorites] = useState<number[]>(() => {
     try {
      const localFavorites = localStorage.getItem('favorites');
      return localFavorites ? JSON.parse(localFavorites) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('workers', JSON.stringify(workers));
  }, [workers]);
  
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const getWorkerById = (id: number): Worker | undefined => {
    return workers.find(w => w.id === id);
  };

  const addWorker = (workerData: Omit<Worker, 'id'|'distance'>) => {
    const newWorker: Worker = {
      ...workerData,
      id: Date.now(),
      distance: 0, // Will be calculated on the fly
    };
    setWorkers(prev => [newWorker, ...prev]);
    showToast('Worker added successfully!', 'success');
  };

  const updateWorker = (updatedWorker: Worker) => {
    setWorkers(prev => prev.map(w => w.id === updatedWorker.id ? updatedWorker : w));
    showToast('Worker updated successfully!', 'success');
  };

  const deleteWorker = (id: number) => {
    if (window.confirm('Are you sure you want to delete this worker?')) {
        setWorkers(prev => prev.filter(w => w.id !== id));
        showToast('Worker deleted.', 'error');
    }
  };

  const addReview = (workerId: number, review: Omit<Review, 'id' | 'userImage'>) => {
    const updateWorkersList = (list: Worker[]) => 
      list.map(worker => {
        if (worker.id === workerId) {
          const newReview: Review = {
            ...review,
            id: Date.now(),
            userImage: 'https://picsum.photos/id/100/50/50',
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
      });
      
    setWorkers(prevWorkers => updateWorkersList(prevWorkers));
  };

  const toggleFavorite = (workerId: number) => {
    setFavorites(prev => 
      prev.includes(workerId) 
        ? prev.filter(id => id !== workerId) 
        : [...prev, workerId]
    );
  };


  return (
    <WorkerContext.Provider value={{ workers, getWorkerById, addWorker, updateWorker, deleteWorker, addReview, favorites, toggleFavorite }}>
      {children}
    </WorkerContext.Provider>
  );
};
