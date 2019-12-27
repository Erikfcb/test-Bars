import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

export const Item = ({
  element: { album, title, artist, id, duration },
  onClick,
  isPlaying
}) => (
  <Wrapper isPlaying={isPlaying}>
    <Image variant="top" src={album.cover} />
    <Card.Header as="h5">{title}</Card.Header>
    <Card.Body>
      <Card.Title>Album: {album.title}</Card.Title>
      <Card.Text>
        <div>Artist: {artist.name}</div>
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
  border: ${props => (props.isPlaying ? "3" : "0")}px solid red;
  margin: 20px 0;
  &:hover {
    background: #ebfff7;
  }
`;

const Image = styled(Card.Img)`
  width: 100px;
  height: 100px;
`;
