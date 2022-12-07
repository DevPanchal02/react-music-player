import React from 'react'
import {useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Index() {

  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

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
    {<br/>}
    <button 
            onClick={() => window.open(`https://www.youtube.com/results?search_query=${data.album_title +" " +data.artist_name +" "+data.track_title}`)}>
            Listen on Youtube  
    </button>    

  </pre>;

  async function fetchTableDate() {
    setLoading(true)
    const URL = "http://localhost:3000/api/data/tracks"
    const res = await axios.get(URL);
    setData(res.data);
    setFilterData(res.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchTableDate()
  },[])

  const handleSearch = (e) => {

    const getSearch = e.target.value;

    if (getSearch.length > 0) {
    let filteredData = data.filter(function (search){
      return search.album_title.toLowerCase().includes(getSearch.toLowerCase()) || search.artist_name.toLowerCase().includes(getSearch.toLowerCase()) || search.track_title.toLowerCase().includes(getSearch.toLowerCase()) || search.track_id.includes(getSearch);
    })
    setData(filteredData);
  }
  else {
    setData(filterData);
  }
  setQuery(getSearch); 
}

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

  const onStreetPlaylist= () => {
    let link = Math.random().toString(36).slice(2)
    let filteredData = data.filter(function (search){
      return search.album_title.toLowerCase().includes("street") || search.artist_name.toLowerCase().includes("street") || search.track_title.toLowerCase().includes("street");
    })
    navigate(`/main/${link}`, {state : {values: filteredData, name: 'Street Music'}});
  }

  const onRockPlaylist= () => {
    let link = Math.random().toString(36).slice(2)
    let filteredData = data.filter(function (search){
      return search.album_title.toLowerCase().includes("rock") || search.artist_name.toLowerCase().includes("rock") || search.track_title.toLowerCase().includes("rock");
    })
    navigate(`/main/${link}`, {state : {values: filteredData, name: 'Rock Music'}});
  }

  
  const onPop= () => {
    let link = Math.random().toString(36).slice(2)
    let filteredData = data.filter(function (search){
      return search.album_title.toLowerCase().includes("rock") || search.artist_name.toLowerCase().includes("rock") || search.track_title.toLowerCase().includes("rock");
    })
    navigate(`/main/${link}`, {state : {values: filteredData, name: 'Rock Music'}});
  }

  return (
    <div>
     <div>Welcome to the main page</div> 
     <div><button type='button' onClick ={onUpdateAccount}>Update Account</button></div>
     <div><button type='button' onClick ={onLogout}>Log Out</button></div>

    <div>
      <input type="text" name='name' value={query} placeholder='Search' onChange={(e) =>handleSearch(e)}/>
    </div>
    <br></br>
    <div>View Public Playlists </div>
    <div><button type='button' onClick ={onStreetPlaylist}>Street</button></div>
    <div><button type='button' onClick ={onRockPlaylist}>Rock</button></div>
    <div><button type='button' onClick ={onLogout}>Pop</button></div>
    <div><button type='button' onClick ={onLogout}>Folk</button></div>

     <div>
      <DataTable title ="Data" columns={colums} data={data} progressPending={loading} pagination expandableRows expandableRowsComponent={ExpandedComponent}/>
    </div>

    </div>
  )
}
