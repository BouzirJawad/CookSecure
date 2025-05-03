import React, { useEffect, useState } from 'react'
import axios from "axios"

function Countries() {

  const [countries, setCountries] = useState([])

  useEffect(() =>  {
    fetchCountries()
  }, [])
  
  async function fetchCountries() {
    try {
      const res = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
      const countries = res.data.meals
      .map(item => item.strArea)
        console.log(countries)
        setCountries(countries)
        
    } catch (err) {
      console.error('Error fetching countries:', err.message);
    }
  }
  async function postDAta() {
    await axios.post("http://localhost:7460/countries", countries)
  }

  return (
    <div>
      <button className='primary-btn' onClick={()=>postDAta()}>
        click here
      </button>
    </div>
  )
}

export default Countries