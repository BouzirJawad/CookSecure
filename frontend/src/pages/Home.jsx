import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import MainPage from "../components/MainPage";
import RecipeDetails from "../components/RecipeDetails";
import mbg from "../assets/mbg.jpg"

function Home() {
  return (
    <>
      <div style={{backgroundImage: `url(${mbg})`}} className='h-screen bg-center bg-cover'>
        <Header />
        <Routes>
          <Route path="/mainpage/" element={<MainPage />} />
          <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default Home;
