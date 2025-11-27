import React from 'react';

export interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface CategorySection {
  title: string;
  categories: Category[];
}

export interface Review {
  id: number;
  userName: string; // mapped to 'user' in backend
  userImage: string;
  rating: number;
  comment: string;
  mediaUrl?: string;
  date?: string;
}

export interface Worker {
  id: number;
  name: string;
  age: number;
  categoryId: string;
  categoryName: string; // service_category
  experience: number;
  rating: number;
  reviewCount: number;
  distance: number;
  photo: string; // photo_url
  verified: boolean;
  available: boolean; // availability: available | busy
  featured: boolean;
  city: string; // location
  latitude: number;
  longitude: number;
  serviceAreas: string[];
  reviews: Review[];
  phone: string; // mobile
  bio: string;
  skills: string[];
  hourlyRate?: number;
  nextAvailable?: string;
  badges?: string[];
  jobsCompleted: number; // NEW FIELD
  createdAt?: string;
  updatedAt?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  type: 'flat' | 'percentage';
  value: number;
  validTill: string;
}

export interface Booking {
  id: number;
  workerId: number;
  workerName: string;
  service: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  date: string;
  customerName: string;
}

export interface CartItem {
  workerId: number;
  workerName: string;
  serviceName: string;
  price: number;
  image: string;
}