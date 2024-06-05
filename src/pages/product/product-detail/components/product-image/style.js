import styled from 'styled-components';

export const ImageWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 40px;
`;

export const MainImage = styled.div`
  width: 400px;
  height: 400px;
  background-color: gray;
  flex-shrink: 0;
  margin: 20px 0;
  position: relative;
  z-index: 1;
`;

export const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  z-index: 1;
`;

export const Thumbnail = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 10px;
  cursor: pointer;
  background-color: ${({ color }) => color || 'transparent'};
`;

export const TestImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  background-color: ${({ color }) => color};
`;