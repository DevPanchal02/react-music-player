import React from 'react'
import {useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import {useState, useEffect} from 'react';
import axios from 'axios';
<<<<<<< HEAD

=======
import styled from 'styled-components';
>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed



export default function Index() {

  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
<<<<<<< HEAD
  const [playlistName, setPlaylistName] = useState("");
  const [selectedRows, setSelectedRows] = React.useState([]);
	const [toggleCleared, setToggleCleared] = React.useState(false);
  const [addPlaylist, setAddPlaylist] = React.useState([]);


=======
  const [selectedRows, setSelectedRows] = React.useState([]);
	const [toggleCleared, setToggleCleared] = React.useState(false);
  const [visible, setVisible] = React.useState()

//Sets up colums for the table
>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed
  const colums = [
    {
      name: '#',
      selector: (row) => Number(row.track_id),
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

<<<<<<< HEAD
=======
  //Sets data for when the tables expand
>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed
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

<<<<<<< HEAD
=======
//Fetches data for the table
>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed
  async function fetchTableDate() {
    setLoading(true)
    const URL = "http://localhost:3000/api/data/tracks"
    const res = await axios.get(URL);
    setData(res.data);
    setFilterData(res.data);
    setLoading(false);
  }
<<<<<<< HEAD
  async function fetchPlaylists() {
    const URL = `http://localhost:3000/api/data/playlist/${localStorage.getItem("email")}`
    const res = await axios.get(URL);
    setAddPlaylist(res.data);
    console.log(res.data)
  }

  useEffect(() => {
    fetchTableDate()
    fetchPlaylists()
  },[])

=======

  useEffect(() => {
    fetchTableDate()
  },[])

  //Handles search input
>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed
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

<<<<<<< HEAD

  const navigate = useNavigate();
=======
  const navigate = useNavigate();
  //Handles update account button
>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed
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
<<<<<<< HEAD
=======
  //Handles logout button
>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed
  const onLogout = async(e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")){
      alert("Please Log in to your account first")
      navigate('/signin');
    }
    else {
      localStorage.setItem("token", "");
<<<<<<< HEAD
      localStorage.setItem("email", "");
=======
>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed
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
<<<<<<< HEAD

=======
//Handles public playlist
>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed
  const onRockPlaylist= () => {
    let link = Math.random().toString(36).slice(2)
    let filteredData = data.filter(function (search){
      return search.album_title.toLowerCase().includes("rock") || search.artist_name.toLowerCase().includes("rock") || search.track_title.toLowerCase().includes("rock");
    })
    navigate(`/main/${link}`, {state : {values: filteredData, name: 'Rock Music'}});
  }
<<<<<<< HEAD

=======
//Handles public playlist
>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed
  const onPop= () => {
    let link = Math.random().toString(36).slice(2)
    let filteredData = data.filter(function (search){
      return search.album_title.toLowerCase().includes("pop") || search.artist_name.toLowerCase().includes("pop") || search.track_title.toLowerCase().includes("pop");
    })
    navigate(`/main/${link}`, {state : {values: filteredData, name: 'Pop Music'}});
  }
<<<<<<< HEAD
=======
  //Handles public playlist
>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed
  const onFolk= () => {
    let link = Math.random().toString(36).slice(2)
    let filteredData = data.filter(function (search){
      return search.album_title.toLowerCase().includes("folk") || search.artist_name.toLowerCase().includes("folk") || search.track_title.toLowerCase().includes("folk");
    })
    navigate(`/main/${link}`, {state : {values: filteredData, name: 'Folk Music'}});
  }
<<<<<<< HEAD
=======
  //Handles public playlist
>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed
  const onMostPlayed= () => {
    let link = Math.random().toString(36).slice(2)
    let filteredData = data.filter(function (search){
      return search.track_listens > 50000;
    })
    navigate(`/main/${link}`, {state : {values: filteredData, name: 'Most Played'}});
  }
<<<<<<< HEAD

  async function yourPlaylist(yourData){
    let link = Math.random().toString(36).slice(2);
    navigate(`/main/playlist/${link}`, {state : {values: yourData.data, name: yourData.playlistName, review: yourData.review}});
  }

  async function onAddPlaylist(){
    const URL = "http://localhost:3000/api/data/playlist"
    const res = await axios.post(URL, {
      playlistName: playlistName,
      email: localStorage.getItem("email"),
      data: selectedRows
    });
    console.log(res);
    console.log(selectedRows)
  }
function handleYourPlaylists() {
  let arr = [];

  for(let i = 0;i<addPlaylist.length;i++){
      
      arr.push(<button type='button' onClick={() => yourPlaylist(addPlaylist[i])}>{addPlaylist[i].playlistName}</button>);
  }
  return arr;
  }

=======
//Handles selection of the rows
>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed
  const handleRowSelected = React.useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);

<<<<<<< HEAD
  const handlePlaylistName = React.useCallback(state => {
		setPlaylistName(state.target.value);
	}, []);

	const contextActions = React.useMemo(() => {
  
		const handleAddPlaylist = () => {
			
			if (window.confirm(`Are you sure you want to create a playlist with these songs:\r ${selectedRows.map(r => r.Title)}?`)) {
				setToggleCleared(!toggleCleared);
        onAddPlaylist(); 
        window.location.reload();
=======
	const contextActions = React.useMemo(() => {
		const handleAddPlaylist = () => {
			
			if (window.confirm(`Are you sure you want to create a playlist with these songs:\r ${selectedRows.map(r => r.title)}?`)) {
				setToggleCleared(!toggleCleared);
        
>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed
			}
		};

		return (
      <span>
<<<<<<< HEAD
      <input type="text" value={playlistName} placeholder='Playlist Name' onChange={handlePlaylistName}/>
			<button key="add" onClick={handleAddPlaylist} style={{ backgroundColor: 'red' }} icon>Add to Playlist</button>
      </span>
		);
	}, [data, selectedRows, toggleCleared, playlistName]);
=======
			<button key="add" onClick={handleAddPlaylist} style={{ backgroundColor: 'red' }} icon>Add to Playlist</button>
      </span>
		);
	}, [data, selectedRows, toggleCleared]);
>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed


  return (
    <div>
     <div>Welcome to the main page</div> 
     <span><button type='button' onClick ={onUpdateAccount}>Update Account</button></span>
     <span><button type='button' onClick ={onLogout}>Log Out</button></span>
    <br></br>
    <br></br>
    <div>View Public Playlists </div>
    <span><button type='button' onClick ={onMostPlayed}>Most Played</button></span>
    <span><button type='button' onClick ={onStreetPlaylist}>Street</button></span>
    <span><button type='button' onClick ={onRockPlaylist}>Rock</button></span>
    <span><button type='button' onClick ={onPop}>Pop</button></span>
    <span><button type='button' onClick ={onFolk}>Folk</button></span>
    <br></br>
    <br></br>
<<<<<<< HEAD
    <div>Your Own Playlists</div>
    <span>
    {handleYourPlaylists()}
    </span>
    <br></br>
=======
>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed
    <div>
      <div>Search for Music</div>
      <input type="text" name='name' value={query} placeholder='Search' onChange={(e) =>handleSearch(e)}/>
    </div>
     <div>
      <DataTable title ="All Songs" columns={colums} data={data} progressPending={loading} contextActions={contextActions} onSelectedRowsChange={handleRowSelected} clearSelectedRows={toggleCleared} selectableRows pagination expandableRows expandableRowsComponent={ExpandedComponent}/>
    </div>

    </div>
  )
}
<<<<<<< HEAD

=======
>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed
