import React from 'react'
import {useNavigate} from 'react-router-dom';

export default function Index() {

  const navigate = useNavigate();
  const onUpdateAccount = async(e)=>{
    e.preventDefault();
    if (!localStorage.getItem("token")){
      alert("Please Log in to your account first")
      navigate('/signin');
    }
    else {
    navigate('/update-password')
    }
  } 
  const onLogout = async(e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")){
      alert("Please Log in to your account first")
      navigate('/signin');
    }
    else {
      localStorage.setItem("token", "");
      navigate('/');
    }
  }
  return (
    <div>
      
     <div>Welcome to the main page</div> 
      <button type='button' onClick ={onUpdateAccount}>Update Account</button>
      <button type='button' onClick ={onLogout}>Log Out</button>
      </div>
  )
}
