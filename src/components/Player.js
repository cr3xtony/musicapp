import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from '@fortawesome/free-solid-svg-icons';
const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  setChangeSong,
  changeSong,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  const audioRef = useRef(null);
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfor({
      ...songInfo,
      currentTime: current,
      duration,
    });
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfor({ ...songInfo, currentTime: e.target.value });
  };
  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let forward = currentIndex + 1;
    let backward = currentIndex - 1;

    if (direction === 'skip-forward') {
      if (songs[forward]) {
        setCurrentSong(songs[currentIndex + 1]);
      } else {
        setCurrentSong(songs[0]);
      }
    }
    if (direction === 'skip-backward') {
      if (songs[backward]) {
        setCurrentSong(songs[currentIndex - 1]);
      } else {
        setCurrentSong(songs[0]);
      }
    }
  };
  const [songInfo, setSongInfor] = useState({
    currentTime: 0,
    duration: 0,
  });

  useEffect(() => {
    if (changeSong) {
      audioRef.current.play();
      setIsPlaying(true);
      setChangeSong(false);
    }
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  }, [
    changeSong,
    setChangeSong,
    setIsPlaying,
    currentSong.id,
    setSongs,
    songs,
  ]);
  return (
    <div className="player">
      <div className="time-control">
        <p> {getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-backward')}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-forward')}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      />
    </div>
  );
};

export default Player;
