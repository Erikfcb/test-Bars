import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Item } from "./Item";

const searchUrl = "https://deezerdevs-deezer.p.rapidapi.com/search&q=";
const headers = {
  "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  "x-rapidapi-key": "DvlLOJj7ijmsheQWnO4fJjcpGQuwp1zCCuCjsnlQWe029KrNC2"
};

const Guest = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

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
    // TODO: implement
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
          <Item element={element} onClick={addToQueue} />
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
