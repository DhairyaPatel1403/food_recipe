import React, { useState, useEffect } from 'react'
import './style.css';
import { auth, db } from "../firebase/firebase";
import { useLocation, useParams } from 'react-router-dom';
import { doc, setDoc, addDoc, onSnapshot, collection, getDocs, getDoc, and  } from "firebase/firestore"; 
import {  updateDoc, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../context/UserContext';


export const Navbar = () => {

    const { state } = useUserContext();

    const navigate = useNavigate();

    const [searchterm, setsearchterm] = useState(null)

    const recipeCollectionRef = collection(db, 'recipes');
  const [recipeNames, setRecipeNames] = useState([]);

  const { dispatch } = useUserContext();

  const logout = async (e) => {
    dispatch({ type: 'SET_USERNAME', payload: '' });
  }

  const login = async (e) => {
    navigate('/');
  }



    // useEffect(() => {
    //     const fetchData = async () => {
    //         if(searchterm!=null){
    //             try {
    //                 // Create a query that filters recipes based on the search term
    //                 const q = query(recipeCollectionRef, where('name', '==', searchterm));
                    
    //                 // Use onSnapshot to listen for real-time changes
    //                 const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //                   const data = querySnapshot.docs.map((doc) => ({
    //                     id: doc.id,
    //                     ...doc.data(),
    //                   }));
    //                   setRecipeNames(data);
    //                 });
            
    //                 // Clean up the listener when the component unmounts or the search term changes
    //                 return () => unsubscribe();
    //               } catch (error) {
    //                 console.error('Error fetching recipes:', error);
    //               }
    //         }
    //     };
    
    //     fetchData();
    //   }, [recipeCollectionRef, searchterm]);


    //   const handleKeyPress = (e) => {
    //     console.log(searchterm)
    //     searchterm.trim();
    //     if (e.key === 'Enter' && searchterm!=null) {
    //       // Perform search logic
    //       const recipe = recipeNames.find((recipe) => recipe.name.toLowerCase() === searchterm.toLowerCase());
    //       if (recipe) {
    //         // Navigate to the viewitem route with recipe id and name
    //         navigate(`/viewitem/${recipe.author}/${recipe.name}`);
    //       } else {
    //         // Handle case when recipe is not found
    //         console.log('Recipe Not found')
    //         setsearchterm(null);
    //       }
    //     }
        
    //   };



  return (
    <div className='navbar'>
        <div className='logo'>
            Navbar {state.username}
        </div>
        <div className='btns'>
            {(state.username != '' && state.username!=null) ?  <button className='nav-btn' onClick={logout}>Logout</button> : <button className='nav-btn' onClick={login}>Login</button>}
            
            {(state.username != '' && state.username!=null) ? <a href='additem'><button className='nav-btn'>Post</button></a> : <></>}
           
        </div>

    </div>
  )
}
