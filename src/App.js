import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import SingleCrypto from './pages/SingleCrypto';
import FindCrypto from './pages/FindCrypto';
import Error from './pages/Error';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/cryptocurrency/:id' element={<SingleCrypto />} />
        <Route path='/search/:id' element={<FindCrypto />} />
        <Route path='/search' element={<Search />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
