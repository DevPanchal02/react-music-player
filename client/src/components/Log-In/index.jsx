import React from 'react'
import styles from './styles.modules.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";


export default function Index() {
    const [data, setData] = useState({email: "", password: ""});
    const [error, setError] = useState("");

    const handleSubmitButton = async (e) => {
        e.preventDefault();

        try {
            const url = 'http://localhost:3000/api/login';
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            localStorage.setItem("email", res.email);
            if (localStorage.getItem('email') == 'admin@admin.com'){
              window.location = "/admin";
            }
            else {
            window.location = "/main";
            }
        }
        catch (error){
            setError(error.response.data);
        }
    };
    const handleChange = ({currentTarget: input}) => {
        setData({...data,[input.name]: input.value });
    };

    return (

    <div className={styles.login_container}>
      <div className={styles.login_form}>
        <div className={styles.left_section_login}>
          <form className= {styles.login_form_container} onSubmit ={handleSubmitButton}>
            <h1>Login To Your Account</h1>
            
            <input
				type="email"
				placeholder="Email"
				name="email"
				onChange={handleChange}
				value={data.email}
				required
				className={styles.login_input}
				/>

            <input
				type="password"
				placeholder="Password"
				name="password"
				onChange={handleChange}
				value={data.password}
				required
				className={styles.login_input}
				/>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type='submit' className={styles.login_green_btn}>Sign-In</button>
          </form>
        </div>
        <div className={styles.login_right}>
            <h1>Create a New Account Here</h1>
            <Link to= "/signup"> 
                <button type='button' className={styles.login_white_btn}>signup</button>
            </Link>
        </div>
      </div>
    </div>
  )
}
