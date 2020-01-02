import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import io from "socket.io-client";

import { Item } from "./Item";
import { baseUrl, headers, searchUrl } from "./api";

const socket = io(baseUrl);

const Guest = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    return () => socket.emit("disconnect");
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

  const addToQueue = useCallback(id => {
    socket.emit("add", id);
  }, []);

  return (
    <Wrapper>
      <label>Search your song:</label>
      <SearchInput
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="search a song"
      />
      <Results>
        {results.map(element => (
          <Item element={element} onClick={() => addToQueue(element.id)} />
        ))}
      </Results>
    </Wrapper>
  );
};

export default Guest;

const Wrapper = styled.div`
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
