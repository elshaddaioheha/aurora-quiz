'use client';

import React, { createContext, useContext, useState } from 'react';

export interface BookingData {
  service?: string;
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
}

interface BookingContextType {
  data: BookingData;
  updateData: (newData: Partial<BookingData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<BookingData>({});
  const [currentStep, setCurrentStep] = useState(0);

  const updateData = (newData: Partial<BookingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <BookingContext.Provider value={{ data, updateData, currentStep, setCurrentStep }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
