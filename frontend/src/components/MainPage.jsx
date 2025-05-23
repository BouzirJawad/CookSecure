import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeForm from "./RecipeForm";
import FilterBar from "./FilterBar";
import { Link } from "react-router-dom";
import { useAuth } from "../server/AuthContext";

function MainPage() {
  const { user, logout } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [selected, setSelected] = useState({
    type: "",
    origin: "",
    time: "",
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:7460/recipes");
      setRecipes(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const filtered = recipes.filter((recipe) => {
    const matchesType = selected.type ? recipe.type === selected.type : true;
    const matchesOrigin = selected.origin
      ? recipe.origin === selected.origin
      : true;
    const matchesTime = selected.time ? recipe.time === selected.time : true;
    const matchesSearch = searchTerm
      ? recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchesType && matchesOrigin && matchesTime && matchesSearch;
  });

  const resetFilters = () => {
    setSelected({ meal: "", recipe: "", cuisine: "" });
  };

  return (
    <div className="relative text-white">
      <div className="text-center space-y-4 py-4 bg-[rgba(0,64,71,0.8)] mt-12">
        <p>welcome to</p>
        <p className="text-5xl">
          <span className="text-[#00FBFF]">Cook</span>Secure
        </p>
        <p>The world of a delicious life</p>
      </div>

      <div className="w-full flex justify-center">
        <FilterBar
          selected={selected}
          setSelected={setSelected}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onResetFilter={resetFilters}
        />
      </div>

      <div className="flex mx-auto w-[50%] md:w-[60%]">
        <div className="text-center w-fit px-5 md:px-20 rounded-4xl mx-auto mt-10 py-3 bg-[#004047]">
          <p>Recipes</p>
        </div>
        {user && user.isAdmin && (
          <button
            onClick={() => setIsAdding(true)}
            className="text-center w-fit px-5 md:px-20 text-black rounded-4xl mx-auto mt-10 py-3 bg-[#00EEFF]"
          >
            <p>Add a Recipe</p>
          </button>
        )}
      </div>

      <div className="py-5">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 w-[80%] mx-auto place-items-center">
            {filtered.map((r) => (
              <Link key={r.id} to={`/recipes/${r.id}`}>
                <div className="bg-[#004047] rounded-2xl shadow-lg overflow-hidden hover:scale-102 transition duration-500 w-full max-w-[300px]">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="h-48 w-full rounded-3xl p-3 object-cover"
                  />
                  <p className="text-center pb-3">{r.name}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 w-[80%] min-h-100 mx-auto place-items-center">
            <p>No recipes to display.</p>
          </div>
        )}
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-50 flex justify-center items-start overflow-y-auto py-10">
          <div className=" rounded-md shadow-md w-full max-w-2xl">
            <RecipeForm
              onClose={() => setIsAdding(false)}
              reload={() => fetchRecipes()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
