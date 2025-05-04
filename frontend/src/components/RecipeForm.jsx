import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { RecipeSchema } from "../schemas/RecipeSchema";
import axios from "axios";
import toast from "react-hot-toast";
import AsyncSelect from "react-select/async";

function RecipeForm() {
  const [preview, setPreview] = useState(null);
  const [steps, setSteps] = useState([""]);

  const formik = useFormik({
    initialValues: {
      name: "",
      chef: "",
      origin: "",
      time: "",
      type: "",
      image: "",
      ingredients: [""],
      steps: [""],
    },
    validationSchema: RecipeSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("http://localhost:7460/recipes", values);
        toast.success("Recipe added successfully", { duration: 3000 });
        setTimeout(() => {
          resetForm();
          setPreview(null);
        }, 3000);
      } catch (error) {
        console.error("Error adding recipe:", error);
        toast.error("Error adding recipe", { duration: 2000 });
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("image", reader.result);
        setPreview(reader.result); // for image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddStep = () => {
    const newList = [...formik.values.steps, ""];
    formik.setFieldValue("steps", newList);
  };

  const loadIngredientOptions = async (inputValue) => {
    try {
      const res = await axios.get("http://localhost:7460/ingredients");
      const ingredientsObj = res.data[0];

      if (!ingredientsObj) return [];

      const ingredientArray = Object.values(ingredientsObj || {});

      console.log("Fetched ingredients:", ingredientArray);

      return ingredientArray
        .filter((item) =>
          inputValue
            ? item.toLowerCase().includes(inputValue.toLowerCase())
            : true
        )
        .map((name) => ({
          label: name,
          value: name,
        }));
    } catch (error) {
      console.error("Failed to load ingredients:", error);
      return [];
    }
  };

  const loadCountriesOptions = async (inputValue) => {
    try {
      const res = await axios.get("http://localhost:7460/countries");
      const countriesObj = res.data[0];

      if (!countriesObj) return [];

      const countriesArray = Object.values(countriesObj || {});

      console.log("Fetched countries:", countriesArray);

      return countriesArray
        .filter((item) =>
          inputValue
            ? item.toLowerCase().includes(inputValue.toLowerCase())
            : true
        )
        .map((name) => ({
          label: name,
          value: name,
        }));
    } catch (error) {
      console.error("Failed to load countries:", error);
      return [];
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-4 bg-[#2d2d55] rounded-lg w-[80%] max-w-4xl mx-auto text-white"
    >
      <h2 className="text-center text-cyan-400 text-xl font-bold mb-4">
        Make A Recipe
      </h2>

      <div className="grid grid-cols-3 gap-10 mt-5">
        <div>
          <label>Dish Name</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="w-full p-2 rounded bg-[#3d3d6b]"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}
        </div>
        <div>
          <label>Chef</label>
          <input
            type="text"
            name="chef"
            value={formik.values.chef}
            onChange={formik.handleChange}
            className="w-full p-2 rounded bg-[#3d3d6b]"
          />
          {formik.touched.chef && formik.errors.chef && (
            <p className="text-red-500 text-sm">{formik.errors.chef}</p>
          )}
        </div>
        <div>
          <label>Origin</label>
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadCountriesOptions}
            onChange={(selectedOption) => {
              formik.setFieldValue("origin", selectedOption?.value || "");
            }}
            className="text-[#3d3d6b]"
          />
          {formik.touched.origin && formik.errors.origin && (
            <p className="text-red-500 text-sm">{formik.errors.origin}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 mt-5">
        <div className="">
          <label>Cooking Time</label>
          <select
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            className="w-full p-2 rounded bg-[#3d3d6b]"
          >
            <option value="">Select Time</option>
            <option value="15 min">15 min</option>
            <option value="30 min">30 min</option>
            <option value="45 min">45 min</option>
            <option value="1 hour">1 hour</option>
            <option value="1h 30min">1h 30min</option>
          </select>
          {formik.touched.time && formik.errors.time && (
            <p className="text-red-500 text-sm">{formik.errors.time}</p>
          )}
        </div>
        <div>
          <label>Type</label>
          <select
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            className="w-full p-2 rounded bg-[#3d3d6b]"
          >
            <option value="">Select Type</option>
            <option value="Main">Main</option>
            <option value="Dessert">Dessert</option>
            <option value="Snack">Snack</option>
            <option value="Soup">Soup</option>
          </select>
          {formik.touched.type && formik.errors.type && (
            <p className="text-red-500 text-sm">{formik.errors.type}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label>Ingredients</label>
        <AsyncSelect
          cacheOptions
          defaultOptions
          isMulti
          loadOptions={loadIngredientOptions}
          onChange={(selectedOptions) => {
            formik.setFieldValue(
              "ingredients",
              selectedOptions.map((opt) => opt.value)
            );
          }}
          className="text-[#3d3d6b]"
        />
        {formik.touched.ingredients && formik.errors.ingredients && (
          <p className="text-red-500 text-sm">{formik.errors.ingredients}</p>
        )}
      </div>

      <div className="mt-4">
        <label>Steps</label>
        {formik.values.steps.map((item, idx) => (
          <div key={idx} className="flex gap-2 items-center my-1">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const updated = [...formik.values.steps];
                updated[idx] = e.target.value;
                formik.setFieldValue("steps", updated);
              }}
              className="w-full p-2 rounded bg-[#3d3d6b]"
            />
            <button
              type="button"
              onClick={() => {
                const updated = [...formik.values.steps];
                updated.splice(idx, 1);
                formik.setFieldValue("steps", updated);
              }}
              className="text-red-400 hover:text-red-600"
              title="Delete this step"
            >
              ✕
            </button>
          </div>
        ))}
        {formik.touched.steps && formik.errors.steps && (
            <p className="text-red-500 text-sm">{formik.errors.steps}</p>
          )}
        <button
          type="button"
          onClick={handleAddStep}
          className="text-cyan-300 flex items-center mt-1"
        >
          + Add Step
        </button>
      </div>

      <div className="mt-4">
        <label>Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 rounded bg-[#3d3d6b] text-white"
        />
        {formik.touched.image && formik.errors.image && (
            <p className="text-red-500 text-sm">{formik.errors.image}</p>
          )}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-2 rounded h-50 mx-auto"
          />
        )}
      </div>

      <div className="text-center my-5">
        <button
          type="submit"
          className="mt-6 bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-2 px-4 rounded w-[50%]"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default RecipeForm;
