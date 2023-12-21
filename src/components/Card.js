import React from 'react'
import './style.css'
import { auth, db } from "../firebase/firebase";
import { doc, setDoc, addDoc, collection, getDocs  } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';



export const Card = ({name, url, description, author, type, likes}) => {
  const navigate = useNavigate();

  const gotoCard = async (name, author) => {
    // Assuming you want to fetch details from the Firebase Firestore collection
    const querySnapshot = await getDocs(collection(db, 'recipes'));
    querySnapshot.forEach((doc) => {
      const recipeData = doc.data();
      if (recipeData.name === name && recipeData.author === author) {
        navigate(`/viewitem/${encodeURIComponent(author)}/${encodeURIComponent(name)}`);
      }
    });
  }


  return (
    <li className="cards_item">
            <div className="card" tabindex="0">
              <div className="card_image"><img src={url} alt="Recipe loading... "/></div>
              <div className="card_content">
                <h2 className="card_title">{name}</h2>
                <div className="card_text">
                  <p>{description}</p>
                  <div className='together-class'>
                    <strong> ✍︎ {author}</strong>
                    <p className='together'>Likes {likes}</p>
                  </div>
                  <p className="upcharge">{type}</p>
                </div>
              </div>
              <button className='form-button' onClick={() => gotoCard(name, author)}>View the recipe</button>
            </div>
    </li>
  )
}
