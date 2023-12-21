import React, {useEffect, useState} from 'react'
import './style.css'
import { auth, db } from "../firebase/firebase";
import { useLocation, useParams } from 'react-router-dom';
import { doc, setDoc, addDoc, collection, getDocs, getDoc  } from "firebase/firestore"; 
import {  updateDoc, query, where } from 'firebase/firestore';
import { useUserContext } from '../context/UserContext';

export const ViewItem = () => {

  const { state } = useUserContext();

    const { id, recipename } = useParams();

    const [recipe, setRecipe] = useState(null);

    const [liked, setliked] = useState(false);

    const [comment, setcomment] = useState(null)



    useEffect(() => {
        console.log(recipename, id)
        const fetchData = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, 'recipes'));
            querySnapshot.forEach((doc) => {
              const recipeData = doc.data();
              if (
                recipeData.name === (recipename) &&
                recipeData.author === (id)
              ) {
                setRecipe(recipeData);
                
                const likedByUser = recipeData.like_users.includes(state.username);
                setliked(likedByUser);
              }
            });
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();

        
      }, []);



      const like = async () => {
        try {
          const recipesQuery = query(collection(db, 'recipes'), where('author', '==', recipe.author), where('name', '==', recipe.name));
          const querySnapshot = await getDocs(recipesQuery);

          if(recipe.like_users.includes(state.username)){
            const recipesQuery = query(collection(db, 'recipes'), where('author', '==', recipe.author), where('name', '==', recipe.name));
            const querySnapshot = await getDocs(recipesQuery);
            
            if (!querySnapshot.empty) {
              const docRef = doc(db, 'recipes', querySnapshot.docs[0].id);
            
              // Update the like count and remove 'narendramodi' from like_users
              await updateDoc(docRef, {
                likes: Math.max((recipe.likes || 0) - 1, 0),
                like_users: (recipe.like_users || []).filter(user => user !== state.username),
              });
            
              // Fetch the updated recipe data after the like is decremented
              const updatedRecipeSnapshot = await getDocs(docRef);
              const updatedRecipeData = updatedRecipeSnapshot.docs[0].data();
            
              // Update the local state to reflect the new like count and like_users
              setRecipe(updatedRecipeData);
            }
            
          }
          else{
            if (!querySnapshot.empty) {
              const docRef = doc(db, 'recipes', querySnapshot.docs[0].id);
              await updateDoc(docRef, {
                likes: (recipe.likes || 0) + 1,
                like_users: [...(recipe.like_users || []), state.username],
              });
            
              // Fetch the updated recipe data after the like is incremented
              const updatedRecipeSnapshot = await getDocs(docRef);
              const updatedRecipeData = updatedRecipeSnapshot.docs[0].data();
            
              // Update the local state to reflect the new like count and like_users
              setRecipe(updatedRecipeData);
        
        
              console.log('Like incremented successfully!');
            }
          }
      
        }
       catch (error) {
          console.error('Error incrementing like:', error);
        }
      };













      const addCommentToRecipe = async (recipeName, recipeAuthor, newComment) => {
        try {
          const recipesQuery = query(collection(db, 'recipes'), where('name', '==', recipeName), where('author', '==', recipeAuthor));
          const querySnapshot = await getDocs(recipesQuery);
      
          if (!querySnapshot.empty) {
            const docRef = doc(db, 'recipes', querySnapshot.docs[0].id);
            const recipeSnapshot = await getDoc(docRef);
      
            if (recipeSnapshot.exists()) {
              const currentComments = recipeSnapshot.data().comments || [];
              const updatedComments = [...currentComments, newComment];
      
              // Update the recipe in the database with the new comments
              await updateDoc(docRef, { comments: updatedComments });
              console.log('Comment added successfully!');
            } else {
              console.log('Recipe not found.');
            }
          } else {
            console.log('Recipe not found.');
          }
        } catch (error) {
          console.error('Error adding comment:', error);
        }
      };







      const handleComment = async () => {
        if (comment.trim() === '') {
          console.log('Comment cannot be empty.');
          return;
        }
    
        // Call the function to add the comment to the recipe
        await addCommentToRecipe(recipe.name, recipe.author, comment);
    
        // Clear the comment input after adding the comment
        setcomment('');
      };

  return (
    <div className='viewrecipe'>
      {recipe ? (
        <div>
          <div className='rec-name'>
            <p id='recipename'>{recipe.name}</p>
            <p id='author'>By {recipe.author}</p>
          </div>
          
          <div className='rec-rec'>
            <p>Recipe</p><p>{recipe.recipe}</p>
          </div>
          
          <div className='rec-social'>
            {state.username != '' ? <p id='likes'>Stars : {recipe.likes} <button className='like-button' onClick={like}>{liked ? '🌟' : '⭐'}</button></p> : <h2>Login to Like</h2>}



            

            <div className='comment-section'>
              <p className='comment-header'>Reviews:</p>
              {recipe.comments && recipe.comments.length > 0 ? (
                <div className='comments'> 
                  {recipe.comments.map((comment, index) => (
                    <p className='comment' key={index}>{comment}</p>
                  ))}
                </div>
              ) : (
                <p>No comments yet.</p>
              )}

              
            </div>

            {state.username != '' ?               
            <div className='owncomment'>
              <input className='comment-box' onChange={(e) => setcomment(e.target.value)} placeholder='Place your comment here !'></input>
              <button className='comment-btn' onClick={handleComment}>Comment</button>
              </div> : <h2>Login to Comment</h2>}


          </div>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
