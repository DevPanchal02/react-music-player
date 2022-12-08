const express = require('express');
const app = express();
const csv = require('csv-parser');
const fs = require('fs');
const bodyParser = require('body-parser');
const router = require ("express").Router();
const Playlist = require('../models/playlist');

//Creates empty arrays for neccessary values
let artistsArr = [];
let genresArr = [];
let tracksArr = [];
let albumsArr = [];

//calls bodyParser
app.use(bodyParser.json());

//Reads and parses to an array from genres.csv
fs.createReadStream('../data/genres.csv').pipe(csv({})).on('data', (data) => {
    //creates object for name,id and parent id for Genres
    genres_info = {
        genre_name : data.title,
        genre_id : data.genre_id,
        parent_id : data.parent
    } 
    //pushes object into genres array
    genresArr.push(genres_info);
})

//Reads and parses to an array from raw_artists.csv
fs.createReadStream('../data/raw_artists.csv').pipe(csv({})).on('data', (data) => {
    //creates object for the neccesary info
    artists_info = {
        artist_ID : data.artist_id,
        artist_handle : data.artist_handle,
        artist_name : data.artist_name,
        artist_location : data.artist_location,
        artist_label : data.artist_associated_labels,
        artist_active_year : data.artist_active_year_begin,
        artist_URL : data.artist_url
    } 
    //pushes object into genres array
    artistsArr.push(artists_info);
})

let i = 0;
//Reads and parses to an array from raw_tracks.csv
fs.createReadStream('../data/raw_tracks.csv').pipe(csv({})).on('data', (data) => {
    //creates object for the neccesary info
    tracks_info = {
        id: i++,
        track_id : data.track_id,
        album_id : data.album_id,
        album_title : data.album_title,
        artist_id : data.artist_id,
        artist_name : data.artist_name,
        tags : data.tags,
        track_date_created : data.track_date_created,
        track_date_recorded : data.track_date_recorded,
        track_duration : data.track_duration,
        track_genres : data.track_genres,
        track_number : data.track_number,
        track_title : data.track_title,
        track_listens : Number(data.track_listens)
    } 
    //pushes object into genres array
    tracksArr.push(tracks_info);
});

//Displays all data in artistArr
router.get  ("/data/artists", async (req, res) => {
    res.send (artistsArr);
});
//Displays all data in genresArr
router.get  ("/data/genres", async (req, res) => {
    res.send (genresArr);
});
//Displays all data in tracksArr
router.get  ("/data/tracks", async (req, res) => {
    res.send (tracksArr);
});

//Gets Playlist from Database

//Saves Playlist to Database
router.post('/data/playlist', async (req, res) => {
    const playlist = new Playlist ({
        playlistName: req.body.playlistName,
        email: req.body.email,
        data: req.body.data
    })
    try {
        const newPlaylist = await playlist.save()
        res.status(201).json (newPlaylist);
    }
    catch (err){
        res.status(400).json({message : err.message})
    }
})





module.exports = router;