import "./App.css";
import React from "react";
import HomePage from "./pages/homepage/homepage.component";
import NavBar from "./components/navbar/navbar.component";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <HomePage />
    </div>
  );
};

export default App;
