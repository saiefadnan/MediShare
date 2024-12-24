import Navbar from './components/navbar';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles/App.css';
import { Suspense } from 'react';

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/home' element={<Home/>}/>
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
  );
}

export default App;