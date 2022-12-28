import React from 'react'
import DataTable from 'react-data-table-component';
import {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';

export default function Index() {
  const {state} = useLocation();
  const {values, name, review} = state;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userReview, setUserReview] = useState('');
  const [addReview, setAddReview] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  
  

  useEffect(() => {
    function loadData(){
    setLoading(true);
    setData(values);
    setLoading(false);
    setUserReview(review);
    }
    loadData()
  },[])
  const colums = [
    {
      name: '#',
      selector: (row) => row.track_id,
      sortable: true
    },
    {
      name: "Title",
      selector: (row) => row.track_title,
      sortable: true

    },
    {
      name: "Artist",
      selector: (row) => row.artist_name,
      sortable: true

    },
    {
      name: "Album",
      selector: (row) => row.album_title,
      sortable: true

    },
    {
      name: "Listens",
      selector: (row) => row.track_listens,
      sortable: true
    },
    {
      name: "Duration",
      selector: (row) => row.track_duration,
      sortable: true
    }
  ];

  const ExpandedComponent = ({ data }) => <pre>
  Track ID:{data.track_id} {<br/>}
  Album ID:{data.album_id} {<br/>}
  Album Title:{data.album_title} {<br/>}
  Artist ID:{data.artist_id} {<br/>}
  Artist Name:{data.artist_name} {<br/>}
  Track Date Recorded:{data.track_date_recorded} {<br/>}
  Track Duration:{data.track_duration} {<br/>}
  Track Number:{data.track_number} {<br/>}
  Track Title:{data.track_title} {<br/>}
  Genres:{data.track_genres} {<br/>}
  Listens: {data.track_listens} {<br/>}
  {<br/>}
  <button 
    onClick={() => window.open(`https://www.youtube.com/results?search_query=${data.album_title +" " +data.artist_name +" "+data.track_title}`)}>
    Listen on Youtube  
  </button>    

</pre>;
async function handleDeletion() {
    const url = `http://localhost:3000/api/data/playlist/${name}`
    const res = await axios.delete(url);
    console.log('Playlist Deleted');
}

const handleDelete = () => {
    try {
        handleDeletion();
        setError("Playlist Has Been Deleted")
        setTimeout(function() {
            navigate('/main');
          }, 1500);
    }
    catch(error){
        console.log(error);
    }
}
async function handleReviews() {
    const url = `http://localhost:3000/api/data/playlist/${name}`
    const res = axios.post(url, {review: addReview})
    console.log(res);
}
const addNewReview = () => {
    try {
        handleReviews();
        setReviewMessage('Review Added')
        setTimeout(function() {
            navigate('/main');
          }, 1500);
    }
    catch(error){
        console.log(error.message);
    }
}



const handleAddReview =(e) => {
    setAddReview(e.target.value);
}

    return (
        
    <div>
    <div>
    <button 
        onClick={() => navigate('/main') }>
         {'◄'} Back 
    </button>    
    </div>
    <div>
        <br />
        <button type='button' onClick={handleDelete}>Delete Playlist</button>
    </div>
    {error && <div>{error}</div>}
     <div>
      <DataTable title ={name} columns={colums} data={data} progressPending={loading} pagination expandableRows expandableRowsComponent={ExpandedComponent}/>
    </div>
    <div>
        <input type='text' value={addReview} onChange={handleAddReview} placeholder="Add Review"></input>
        <button type='button' onClick={addNewReview}>Submit</button>
        {reviewMessage && <div>{reviewMessage}</div>}
    </div>
    <div>
        <h4>Reviews:</h4>
        {userReview}
    </div>
    </div>

  )
}
