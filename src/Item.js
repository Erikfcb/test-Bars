import React from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import styled from "styled-components";

export const Item = ({
  element: { album, title, artist, id, duration },
  onClick
}) => (
  <Wrapper>
    {console.log("album :", album)}
    <Card.Img variant="top" src={album.cover} />
    <Card.Header as="h5">{title}</Card.Header>
    <Card.Body>
      <Card.Title>Album: {album.title}</Card.Title>
      <Card.Text>
        <div>Artist: {artist.name}</div>
        <div>Id: {id}</div>
        <div>
          Duration: {Math.floor(duration / 60)}m:
          {duration % 60}s
        </div>
      </Card.Text>
      {onClick && (
        <Button variant="primary" onClick={() => onClick(id)}>
          Add to queue
        </Button>
      )}
    </Card.Body>
  </Wrapper>
);

const Wrapper = styled(Card)`
  &:hover {
    background: #ebfff7;
  }
`;
