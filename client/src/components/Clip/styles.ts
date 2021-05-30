import styled from "styled-components";

import { GoToStreamButton } from "../Stream/styles";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--container-bg-color);
  border-radius: var(--container-border-radius);
  height: 90vh;
  width: 90vw;
  padding: 1rem;
  margin-top: 2rem;
`;

export const ViewOtherClipsButton = styled(GoToStreamButton)`
  background-color: green;
`;

export const EmbedClipContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-bottom: 1rem;
`;

export const EmbedClip = styled.iframe`
  height: 100%;
  width: 100%;
  border: none;
  border-radius: var(--container-border-radius);
`;

export const GoBackClip = styled.div`
  margin-right: 1rem;
  cursor: pointer;

  & svg {
    width: 3rem;
    transition: color 0.2s ease;

    &:hover {
      color: white;
    }
  }
`;

export const SkipClip = styled.div`
  margin-left: 1rem;
  cursor: pointer;

  & svg {
    width: 3rem;
    transition: color 0.2s ease;

    &:hover {
      color: white;
    }
  }
`;

export const NoClipsContainer = styled(EmbedClipContainer)`
  display: flex;
  font-size: 3rem;
  line-height: normal;
  flex-direction: column;
  text-align: center;
`;
