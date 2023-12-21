import React, { useState } from 'react'
import './style.css'

import { auth, db } from "../firebase/firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

export const AddItem = () => {
  const { state } = useUserContext();

    const navigate = useNavigate();


    const [name, setname] = useState("")
    const [url, seturl] = useState("")
    const [description, setdescription] = useState("")
    const [nationality, setnationality] = useState("")
    const [type, settype] = useState("")
    const [recipe, setrecipe] = useState("")

    const submitRecipe = async () => {
        try {
        
            const userDocRef = doc(collection(db, "recipes"));
        
            // Use setDoc to set the data in the document
            await setDoc(userDocRef, {
              name:name,
              image:url,
              description:description,
              nationality:nationality,
              type:type,
              author:state.username,
              comments:[],
              likes:0,
              recipe:recipe
            });
  
            navigate('/home');
          } catch (error) {
            console.error(error);
          }
    }

    console.log(state.username)



  return (
    <div className='additembody'>
        <div className='form-container'>
            <div className='form-heading'>
                    Share Your Recipe
            </div>

            <form>
                <p><input placeholder='Name of the dish ' onChange={(e)=>setname(e.target.value)}/> </p>
                <p><input placeholder='Image Link ' onChange={(e)=>seturl(e.target.value)}/> </p>
                <p><textarea placeholder='Description ' onChange={(e)=>setdescription(e.target.value)}/> </p>
                <p><textarea placeholder='Recipe with ingredients' onChange={(e)=>setrecipe(e.target.value)}/> </p>
                <p><input placeholder='Nationality ' onChange={(e)=>setnationality(e.target.value)}/> </p>
                <p><input placeholder='veg/non veg' onChange={(e)=>settype(e.target.value)}/> </p>



            </form>

            {state.username != '' ? <button className='form-button' onClick={submitRecipe}>Publish Recipe !</button> : <p>Login to Publish your recipe</p>}
            
            

        </div>
    </div>

  )
}
