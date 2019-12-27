import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import Button from "react-bootstrap/Button";
import { Item } from "./Item";

// naplam death you suffer >> shortest song to check what happens when song ends

const App = () => {
  const trackUrl = "https://deezerdevs-deezer.p.rapidapi.com/track/";
  const searchUrl = "https://deezerdevs-deezer.p.rapidapi.com/search&q=";
  const headers = {
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    "x-rapidapi-key": "DvlLOJj7ijmsheQWnO4fJjcpGQuwp1zCCuCjsnlQWe029KrNC2"
  };

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [trackList, setTrackList] = useState([]);
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  console.log("current :", current);

  useEffect(() => {
    window.DZ.player.setRepeat(0);
  }, []);
  useEffect(() => {
    setResults([]);
    query &&
      fetch(searchUrl + query, { headers })
        .then(results => {
          return results.json();
        })
        .then(data => {
          setResults(data.data);
        });
  }, [query]);

  useEffect(() => {
    // Callback function is called when the currently playing track has changed
    window.DZ.Event.subscribe("tracklist_changed", function(track) {
      console.log("tracklist_changed track:", track);
    });

    window.DZ.Event.subscribe("player_play", function() {
      setIsPlaying(true);
    });

    window.DZ.Event.subscribe("player_paused", function() {
      setIsPlaying(false);
    });

    // Callback function is called when the volume level of the current player has changed
    window.DZ.Event.subscribe("track_end", function(ended) {
      console.log("track_end event fired");
      const temp = [...trackList];
      temp.shift();
      setTrackList([...temp]);
    });
  }, [trackList]);

  useEffect(() => {
    trackList.length && window.DZ.player.addToQueue(trackList);
  }, [trackList]);

  const playTrack = useCallback(() => {
    window.DZ.player.play();
  }, []);
  const pauseTrack = useCallback(() => {
    window.DZ.player.pause();
  }, []);
  const playNext = useCallback(() => {
    window.DZ.player.next();
  });

  const addToQueue = useCallback(
    id => {
      setTrackList([...trackList, id]);
    },
    [trackList]
  );

  useEffect(() => {
    Promise.all(
      trackList.map(trackID => {
        return fetch(trackUrl + trackID, { headers })
          .then(results => results.json())
          .then(data => data);
      })
    ).then(data => {
      setCurrent(data[0]);
      const temp = [...data];
      temp.shift();
      setQueue([...temp]);
    });
  }, [trackList]);
  console.log("trackList :", trackList);

  return (
    <Wrapper id="wrapper">
      <Host>
        <MyButton
          onClick={() => {
            playTrack();
          }}
          disabled={!trackList.length}
        >
          Play
        </MyButton>
        <MyButton
          onClick={() => {
            pauseTrack();
          }}
          disabled={!isPlaying}
        >
          Pause
        </MyButton>
        <MyButton
          onClick={() => {
            playNext();
            const temp = [...trackList];
            temp.shift();
            setTrackList([...temp]);
          }}
          disabled={trackList.length < 1 || !queue.length}
        >
          Next
        </MyButton>
        <div>Current:</div>
        {current && <Item element={current} isPlaying={isPlaying} />}
        <div>
          Next to be played:
          {queue.map(element => (
            <Item element={element} />
          ))}
        </div>
      </Host>
      <Guest>
        <label>Search your song:</label>
        <SearchInput
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="search a song"
        />
        {results.length || !query ? (
          <Results>
            {results.map(element => (
              <Item element={element} onClick={addToQueue} />
            ))}
          </Results>
        ) : (
          <Loader />
        )}
      </Guest>
    </Wrapper>
  );
};

export default App;

const spin = keyframes`
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Host = styled.div`
  padding 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  background-color: #ebebeb;
  `;
const Guest = styled.div`
  padding 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: #ebf2ff;
  height: 100%;
`;

const SearchInput = styled.input`
  width: 20%;
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
`;

const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`;

const MyButton = styled(Button)`
  width: 100px;
`;
