import React from 'react'
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import MainPanel from './components/MainPanel';


function App() {
  return (
    <div className="App">
      <Header />
      <MainPanel />
      <Footer />
    </div>
  );
}

export default App;
