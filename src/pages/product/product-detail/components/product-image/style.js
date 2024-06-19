import styled from 'styled-components';

export const ImageContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 40px;
`;

export const MainImage = styled.div`
  width: 500px;
  height: 500px;
  border: 1px solid red;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block; 
  }
`;

export const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  z-index: 1;
`;

export const Thumbnail = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 10px;
  border: 1px solid blue;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;