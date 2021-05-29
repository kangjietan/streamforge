import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--container-bg-color);
  border-radius: var(--container-border-radius);
  height: 75vh;
  width: 75vw;
  padding: 1rem;
`;

export const CurrentStreamer = styled.h1`
  color: var(--primary-text-color);
`;

export const CurrentGame = styled.h2``;

export const EmbedClipContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  height: 75%;
`;

export const EmbedClip = styled.iframe`
  height: 100%;
  width: 90%;
  flex: 2;
  border: none;
  border-radius: var(--container-border-radius);
`;

export const GoBackClip = styled.div`
  margin-right: 1rem;
`;

export const SkipClip = styled.div`
  margin-left: 1rem;
`;