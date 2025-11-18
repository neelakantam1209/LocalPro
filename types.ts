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
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  mediaUrl?: string;
}

export interface Worker {
  id: number;
  name: string;
  age: number;
  categoryId: string;
  categoryName: string;
  experience: number;
  rating: number;
  reviewCount: number;
  distance: number;
  photo: string;
  verified: boolean;
  available: boolean;
  featured: boolean;
  city: string;
  latitude: number;
  longitude: number;
  serviceAreas: string[];
  reviews: Review[];
  phone: string;
  bio: string;
  skills: string[];
  hourlyRate?: number;
  nextAvailable?: string;
  badges?: string[];
}
