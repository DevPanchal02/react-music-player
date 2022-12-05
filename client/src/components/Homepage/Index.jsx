import React from 'react'
//import styles from './styles.modules.css';
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <div>

    <div>
        <h1> Music App</h1>
        <p> Listen to new music! Create Your Playlist! Discover New Artists!</p>
    </div>
    <div>       
    <h2>Welcome Back</h2>
    <Link to= '/signin'>
      <button type='button' className='test'>
        Sign In
      </button>
    </Link>
    </div>

    <div>       
    <h2>Sign Up</h2>
    <Link to= '/signup'>
      <button type='button' className='test'>
        Sign Up
      </button>
    </Link>
    </div>  

    <div>       
    <h2>Continue without an Account</h2>
    <Link to= '/main'>
      <button type='button' className='test'>
        Find new Music
      </button>
    </Link>
    </div>  

  </div>
  
  )
}
