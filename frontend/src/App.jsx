import Navbar from './components/navbar';
import Home from './pages/Home';
import Donation from './pages/Donation';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense } from 'react';

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/home' element={<Home/>}/>
              <Route path='/donation' element={<Donation/>}/>
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
  );
}

export default App;

