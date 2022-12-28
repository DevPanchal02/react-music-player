import React, {useState} from 'react'
import axios from 'axios';

export default function Index() {

    const [searchUser, setSearchUser] = useState('');
    const [message, setMessage] = useState('');

    const handleUserSearch = (e) => {
        setSearchUser(e.target.value);
    }
    async function handleNewAdmin() {
        const url = `http://localhost:3000/api/updateAdmin/${searchUser}`
        const res = await axios.patch(url);
        console.log(res.json);
        setMessage(res.data.message)
    }

    const handleNewAdmitSubmit = () => {
        try{
        handleNewAdmin()
        }
        catch(error) {
            console.log(error);
        }
    }
    
    
  return (
    <div>
        <div>Admin Home</div>
        <br></br>
        <br></br>
        <div>Grant Administrator Privileges to another User</div>
        <input type='text' value={searchUser} onChange={handleUserSearch}></input>
        <button type='button' onClick={handleNewAdmitSubmit}>Submit</button>
        {message && <div>{message}</div>}
    </div>
  )
}
