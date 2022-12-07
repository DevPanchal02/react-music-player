import React from 'react'
import DataTable from 'react-data-table-component';
import {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

export default function Index() {
  const {state} = useLocation();
  const {values, name} = state;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    function loadData(){
    setLoading(true);
    setData(values);
    setLoading(false);
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

    return (
        
    <div>
    <div>
    <button 
        onClick={() => navigate('/main') }>
         {'◄'} Back 
    </button>    
    </div>
     <div>
      <DataTable title ={name} columns={colums} data={data} progressPending={loading} pagination expandableRows expandableRowsComponent={ExpandedComponent}/>
    </div>

    </div>

  )
}
