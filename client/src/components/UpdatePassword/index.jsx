import React from 'react'
import { useState} from 'react'
import styles from './styles.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Index() {
    const [data, setData] = useState({email: "",newPassword: "", confirmPassword: ""});
    const [error, setError] = useState("");

    const handleChange = ({currentTarget: input}) => {
        setData({...data,[input.name]: input.value });
    };
    const navigate = useNavigate();

    const onUpdateButton = async(e) =>{
        e.preventDefault();
        let userID;
        try {
            const url = `http://localhost:3000/api/accounts/${data.email}`;
            const res = await axios.get(url);
            userID = res.data._id;
        }
        catch (error){
            setError(error);
        }
        try{
            if(userID) {
                const url = `http://localhost:3000/api/updatePassword/${userID}`;
                const res = await axios.patch(url, {'newPassword' : data.newPassword, 'confirmPassword': data.confirmPassword});
                console.log(res.status);
                setError("Success Passwod Changed \nPlease log in again...");
                setTimeout(function() {
                    navigate('/signin')
                  }, 3000);
                localStorage.setItem("token", "");
            }
        }
        catch(error) {
            alert(error.response.data);
            setError(error.response.data);
        }
    }


  return (
    <div className={styles.login_container}>
    <div className={styles.login_form}>
      <div className={styles.left_section_login}>
        <form className= {styles.login_form_container} onSubmit ={onUpdateButton}>
          <h1>Update Account Password</h1>
          
          <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className='test'
              />

          <input
              type="password"
              placeholder="New Password"
              name="newPassword"
              onChange={handleChange}
              value={data.newPassword}
              required
              className={styles.login_input}
              />

            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              value={data.confirmPassword}
              required
              className={styles.login_input}
              />
          {error && <div className={styles.error_msg}>{error}</div>}
          <button type='submit' className={styles.login_green_btn}>Change Password</button>
        </form>
      </div>
    </div>
  </div>
  )
}
