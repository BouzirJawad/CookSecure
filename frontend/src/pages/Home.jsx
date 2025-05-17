import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import MainPage from "../components/MainPage";
import RecipeDetails from "../components/RecipeDetails";
import mbg from "../assets/mbg.jpg";

function Home() {

    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        setUser(userData);
      }
  
    }, []);

  return (
    <div className="relative min-h-screen min-w-screen">
      <div
        style={{ backgroundImage: `url(${mbg})` }}
        className="absolute inset-0 bg-center bg-fixed bg-cover -z-10"
      ></div>

      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
      </Routes>
    </div>
  );
}

export default Home;
