import './App.css';

import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Generate } from './pages/Generate/Generate';
import { About } from './pages/About/About';

export const App = () => {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Generate />}></Route>
        <Route path='/about' element={<About />}></Route>
      </Routes>
    </div>
  );
};
