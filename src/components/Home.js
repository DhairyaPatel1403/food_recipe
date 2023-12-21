import React, { useState, useEffect } from 'react'
import './style.css'
import { auth, db } from "../firebase/firebase";
import { doc, setDoc, addDoc, collection, getDocs  } from "firebase/firestore"; 

import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Card } from './Card';


export const Home = () => {

  const navigate=useNavigate();

  const recipeCollectionRef = collection(db, 'recipes');

  const [recipeData, setRecipeData] = useState([]);


    const { state } = useUserContext();


    useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(recipeCollectionRef);
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRecipeData(data);
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      };
  
      fetchData();

      console.log(state.username);
    }, []);



    return (
      <div className='home'>


        <div className="main">
        <ul className="cards">
        {recipeData.map((recipe) => (

          <Card name={recipe.name}
           url= {recipe.image}
           description={recipe.description}
           author={recipe.author}
           type={recipe.type}
           likes={recipe.likes}
          />

        ))}

        </ul>
      </div>


        

      
      </div>
    );
}
