import React from 'react'
import styles from './styles.module.css';
import { Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';


export default function Index() {

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({currentTarget: input}) => {
    setData({...data, [input.name]: input.value})
  }
  
  const handleSubmitButton = async(e) =>{
    e.preventDefault()
    try {
      const url = 'http://localhost:3000/api/register';
      const {data: res} = await axios.post(url, data);
      console.log(res.message);
      navigate('/signin');

    }
    catch (error) {
      if (error.response.data.errors !== undefined){
				setError(error.response.data.errors[0].msg);
      }
      setError(error.response.data.message);
		}
	};

  return (
    <div className={styles.register_container}>
      <div className={styles.regiter_form}>
        <div className={styles.left_section}>
          <h1>Welcome Back</h1>
          <Link to= '/signin'>
            <button type='button' className={styles.signin_button}>
              Sign In
            </button>
          </Link>
        </div>
        <div className={styles.right_section}>
          <form className= {styles.form_container} onSubmit ={handleSubmitButton}>
            <h1>Create Account</h1>

            <input 
            type="text" 
            placeholder='First Name'
            name='firstName'
            onChange={handleChange}
            value={data.firstName}
            required
            className={styles.input}/>

            <input 
            type="text" 
            placeholder='Last Name'
            name='lastName'
            onChange={handleChange}
            value={data.lastName}
            required
            className={styles.input}/>
            
            <input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>

            <input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type='submit' className={styles.green_btn} >Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
