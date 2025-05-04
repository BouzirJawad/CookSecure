import React from "react";

function FilterBar({
  selected,
  setSelected,
  searchTerm,
  setSearchTerm,
  onResetFilter,
}) {
  const meals = ["Breakfast", "Lunch", "Dinner"];
  const recipes = ["Easy", "Healthy", "Quick"];
  const cuisines = ["Italian", "Mexican", "Indian"];

  const renderDropdown = (label, options, category) => (
    <div className="relative group">
      <button className="text-white font-semibold px-4 py-2 underline underline-offset-4">
        {label} <span className="ml-1">▼</span>
      </button>
      <div className="absolute hidden group-hover:block bg-white text-black rounded shadow z-10">
        {options.map((item) => (
          <div
            key={item}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => setSelected({ ...selected, [category]: item })}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="bg-[#004047] flex gap-4 p-4 items-center justify-center text-white">
        <button
          onClick={onResetFilter}
          className=" text-white px-4 py-2 rounded underline underline-offset-4 font-bold"
        >
          Reset Filters
        </button>
        {renderDropdown("Meals", meals, "meal")}
        {renderDropdown("Recipes", recipes, "recipe")}
        {renderDropdown("Cuisines", cuisines, "cuisine")}
      </div>
      <div className="mt-5">
        <div className="text-center">

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search recipes..."
          className="px-4 py-2 rounded-4xl bg-[#1b555c] text-white text-center w-[70%]"
          />
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
