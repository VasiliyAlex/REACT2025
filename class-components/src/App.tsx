import React, { useState } from 'react';
import { CardList } from './components/CardList';
import { Search } from './components/Search';
import './App.css';

export const App: React.FC = () => {
  const [query, setQuery] = useState(() => {
    return localStorage.getItem('searchQuery') || '';
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Search onSearch={handleSearch} />
      <CardList search={query} />
    </div>
  );
};
