import React, { useEffect, useState} from 'react'
import axios from "axios";
import RecipeForm from './RecipeForm';

function MainPage() {
  const [recipes, setRecipes] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className='relative'>
      <div className='text-center'>
        <p>welcome to</p>
        <p><span>Cook</span></p>
      </div>

      {isAdding && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
          <ArticleForm onClose={()=>setIsAdding(false)} />
        </div>
      )}
    </div>
  )
}

export default MainPage