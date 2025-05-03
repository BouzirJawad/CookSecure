import React, { useEffect, useState } from 'react'
import axios from "axios"

function fetch() {

  const [ingredients, setIngredients] = useState([])

  useEffect(() =>  {
    fetchIngredients()
  }, [])
  
  async function fetchIngredients() {
    try {
      const res = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const ingredients = res.data.meals
        .map(item => item.strIngredient)
        .filter(Boolean)
  
        setIngredients(ingredients)
        
    } catch (err) {
      console.error('Error fetching ingredients:', err.message);
    }
  }
  async function postDAta() {
    await axios.post("http://localhost:7460/ingredients", ingredients)
  }

  return (
    <div>
      <button className='primary-btn' onClick={()=>postDAta()}>
        click here
      </button>
    </div>
  )
}

export default fetch