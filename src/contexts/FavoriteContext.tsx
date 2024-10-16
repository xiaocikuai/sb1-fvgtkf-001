import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LearningCard {
  id: number;
  question: string;
  answer: string;
  isFavorite: boolean;
}

interface FavoriteContextType {
  favoriteCards: LearningCard[];
  toggleFavorite: (card: LearningCard) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const useFavoriteContext = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavoriteContext must be used within a FavoriteProvider');
  }
  return context;
};

interface FavoriteProviderProps {
  children: ReactNode;
}

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({ children }) => {
  const [favoriteCards, setFavoriteCards] = useState<LearningCard[]>([]);

  const toggleFavorite = (card: LearningCard) => {
    setFavoriteCards(prevCards => {
      const cardIndex = prevCards.findIndex(c => c.id === card.id);
      if (cardIndex !== -1) {
        // Card exists in favorites, remove it
        return prevCards.filter(c => c.id !== card.id);
      } else {
        // Card doesn't exist in favorites, add it
        return [...prevCards, { ...card, isFavorite: true }];
      }
    });
  };

  return (
    <FavoriteContext.Provider value={{ favoriteCards, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};