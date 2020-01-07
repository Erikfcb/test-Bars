import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [roomID, setRoomId] = useState("");

  return (
    <Wrapper>
      <Link to="/host">Host</Link>
      <Link to="/guest">Guest</Link>
      <Button onClick={() => {}}>Create Room</Button>
      <div style={{ fontWeight: "bold" }}>OR</div>
      <label>Join to an existing room</label>
      <Input placeholder="Enter room ID" />
    </Wrapper>
  );
};

export default Homepage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgb(247, 0, 91);
  color: white;
`;

const Input = styled.input`
  width: 200px;
`;
