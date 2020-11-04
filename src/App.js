import './App.css';
import React from 'react';
import HomePage from './pages/homepage/home';
import NavBar from './components/navbar/navbar';
import './App.styles.scss';
import SpinnerComponent from './components/spinner/spinner.component';

const App = () => {
  return (
    <div className="App">
      <NavBar/>
      <HomePage />
    </div>
  );
};

export default App;
