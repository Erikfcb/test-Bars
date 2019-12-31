import React, { useCallback, useEffect, useState } from "react";
// with ES6 import
import io from "socket.io-client";

import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { Item } from "./Item";
import { baseUrl } from "./api";

const Host = () => {
  useEffect(() => {
    window.dzAsyncInit = function() {
      window.DZ.init({
        appId: "386204",
        channelUrl: "http://localhost:3000/channel.html",
        player: {
          container: "player",
          width: 0,
          height: 0,
          onload: function() {
            window.DZ.player.setRepeat(0);
          }
        }
      });
    };
    (function() {
      var e = document.createElement("script");
      e.src = "https://e-cdns-files.dzcdn.net/js/min/dz.js";
      e.async = true;
      document.getElementById("dz-root").appendChild(e);
    })();
  }, []);

  const [trackList, setTrackList] = useState([]);

  useEffect(() => {
    const socket = io(baseUrl);
    return () => socket.emit("disconnect");
  }, []);

  const playTrack = useCallback(() => {
    window.DZ.player.play();
  }, []);
  const pauseTrack = useCallback(() => {
    window.DZ.player.pause();
  }, []);
  const playNext = useCallback(() => {
    window.DZ.player.next();
  }, []);

  return (
    <Wrapper>
      <MyButton
        onClick={() => {
          playTrack();
        }}
        // disabled={!trackList.length}
      >
        Play
      </MyButton>
      <MyButton
        onClick={() => {
          pauseTrack();
        }}
        // disabled={!isPlaying}
      >
        Pause
      </MyButton>
      <MyButton
        onClick={() => {
          playNext();
          // const temp = [...trackList];
          // temp.shift();
          // setTrackList([...temp]);
        }}
        // disabled={trackList.length < 1 || !queue.length}
      >
        Next
      </MyButton>
      <div>Current:</div>
      {/* {current && <Item element={current} isPlaying={isPlaying} />} */}
      <div>
        Next to be played:
        {/* {queue.map(element => (
          <Item element={element} />
        ))} */}
      </div>
    </Wrapper>
  );
};

export default Host;

const MyButton = styled(Button)`
  width: 100px;
  margin: 5px;
`;

const Wrapper = styled.div`
  padding 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  background-color: #ebebeb;
  `;
