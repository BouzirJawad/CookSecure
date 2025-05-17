import React, { useEffect, useState } from "react";
import { useParams, Link , useNavigate } from "react-router-dom";
import axios from "axios";
import { GoBack } from "../icons/GoBack";
import { Delete } from "../icons/Delete";
import { useAuth } from "../server/AuthContext";
import toast from "react-hot-toast";


function RecipeDetails() {
  const { user, logout } = useAuth();
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(
          `http://localhost:7460/recipes/${recipeId}`
        );
        setRecipe(res.data);
      } catch (err) {
        console.error("Failed to fetch recipe:", err);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const deleteRecipe = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:7460/recipes/${recipeId}`
      );

      if (response.status === 200) {
        navigate("/");
        toast.success("Recipe deleted successfully!", { duration: 4000 });
      } else {
        toast.error("Failed to delete proRecipejct", { duration: 4000 });
        console.error("Failed to delete Recipe");
      }
    } catch (error) {
      toast.error("Error Deleting Recipe", { duration: 4000 });
      console.error("Error Deleting Recipe", error);
    }
  };

  if (!recipe) {
    return (
      <p className="text-white text-center mt-10">Loading recipe details...</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 text-white ">
      <div className="bg-[rgba(0,64,71,0.8)] p-6 rounded-3xl">
        <div className="flex gap-5">
          <Link to={"/"}>
            <GoBack className="text-4xl" />
          </Link>
          <h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>
          {user && user.isAdmin && (

            <button
            onClick={() => deleteRecipe(recipeId)}
            className="flex gap-4 bg-red-700 h-fit p-3 ml-auto place-content-around"
            >
            <Delete className="text-lg" />
            Delete recipe
          </button>
          )}
        </div>

        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full max-h-[400px] object-cover rounded-xl mb-6"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#064248] p-4 rounded-xl shadow">
            <p className="mb-2">
              <span className="font-bold text-[#00FBFF]">Chef:</span>{" "}
              {recipe.chef || "Unknown"}
            </p>
            <p className="mb-2">
              <span className="font-bold text-[#00FBFF]">Origin:</span>{" "}
              {recipe.origin || "Unknown"}
            </p>
            <p className="mb-2">
              <span className="font-bold text-[#00FBFF]">Time:</span>{" "}
              {recipe.time || "N/A"}
            </p>
            <p className="mb-2">
              <span className="font-bold text-[#00FBFF]">Type:</span>{" "}
              {recipe.type || "N/A"}
            </p>
          </div>
        </div>

        <div className="bg-[#015d67] p-5 rounded-xl shadow mb-6">
          <h2 className="text-2xl font-semibold text-[#00FBFF] mb-3">
            🧂 Ingredients
          </h2>
          <ul className="list-disc list-inside space-y-1 text-white">
            {recipe.ingredients?.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
        </div>

        <div className="bg-[#00272B] p-5 rounded-xl shadow">
          <h2 className="text-2xl font-semibold text-[#00FBFF] mb-3">
            📋 Steps
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-white">
            {recipe.steps?.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
