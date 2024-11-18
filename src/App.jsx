import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import WatchList from './components/watchList';
import Movies from './components/movies';
import Banner from './components/banner';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [watchList, setWatchList] = useState(() => {
    // Retrieve watchList from localStorage, or default to an empty array
    const savedWatchList = localStorage.getItem('MoviesWatchList');
    return savedWatchList ? JSON.parse(savedWatchList) : [];
  });

  useEffect(() => {
    // Save watchList to localStorage whenever it changes
    localStorage.setItem('MoviesWatchList', JSON.stringify(watchList));
  }, [watchList]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/watchlist" element={<WatchList watchList={watchList}  setWatchList={setWatchList} />} />
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies watchList={watchList} setWatchList={setWatchList} />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
