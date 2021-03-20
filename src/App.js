import React, { useState } from 'react';
import './styles/app.scss';
import Player from './components/Player';
import Song from './components/Song';
import data from './utils';
import Library from './components/Library';
import Nav from './components/Nav';

function App() {
  const [songs, setSongs] = useState(data());
  const [changeSong, setChangeSong] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        changeSong={changeSong}
        setChangeSong={setChangeSong}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        setChangeSong={setChangeSong}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
    </div>
  );
}

export default App;
