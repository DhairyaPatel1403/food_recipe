import React, { useEffect, useState } from 'react'

import { auth, db } from "../firebase/firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore"; 
import {  getDocs, where, query } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword  } from "firebase/auth";

import { useUserContext } from '../context/UserContext';

import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const navigate = useNavigate();


    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    const { dispatch } = useUserContext();

    const checkUserExists = async (email) => {
      const userQuery = query(collection(db, "users"), where("email", "==", email));
      const userSnapshot = await getDocs(userQuery);
      return !userSnapshot.empty;
    };


    const handleSubmit = async () => {
      try {
        if (username && password) {
          dispatch({ type: 'SET_USERNAME', payload: username });
          const userExists = await checkUserExists(username);
          if (!userExists) {
            const res = await createUserWithEmailAndPassword(auth, username, password);
            const userId = res.user.uid;
            const userDocRef = doc(collection(db, "users"), userId);
            await setDoc(userDocRef, {
              uid: userId,
              email: username,
            });
            navigate('/home');
          } else {
            alert("User already exists. Please log in.");
          }
        } else {
          alert("Fill in all fields");
        }
      } catch (error) {
        alert(error.message);
      }
    };
  
    const handleloginsubmit = async () => {
      try {
        if (username && password) {
          dispatch({ type: 'SET_USERNAME', payload: username });
          const res = await signInWithEmailAndPassword(auth, username, password);
          const userId = res.user.uid;
          navigate('/home');
        } else {
          alert('Fill in all fields');
        }
      } catch (error) {
        alert(error.message);
      }
    };


      
      
      

  return (
    <div className='loginbody'>

      <div className="main-login">
        <input className='input-login' type="checkbox" id="chk" aria-hidden="true"/>

        <div className="signup">

            <label htmlForfor="chk" aria-hidden="true">Sign up</label>
            <input className='input-login' type="email" name="email" placeholder='Email'  onChange={(e) => setusername(e.target.value)} required/>
            <input className='input-login' type="password" name="pswd" placeholder="Password" onChange={(e) => setpassword(e.target.value)} required/>
            <button className='login-button' onClick={handleSubmit}>Sign up</button>

        </div>

        <div className="login">

            <label htmlFor="chk" aria-hidden="true">Login</label>
            <input className='input-login' type="email" name="email" placeholder='Email'  onChange={(e) => setusername(e.target.value)} required/>
            <input className='input-login' type="password" name="pswd" placeholder="Password" onChange={(e) => setpassword(e.target.value)} required/>
            <button className='login-button' onClick={handleloginsubmit}>Login</button>

        </div>
      </div>

    </div>

  )
}
