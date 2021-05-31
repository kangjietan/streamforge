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

export const AutoPlayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;

  & > p {
    margin: 0;
  }
`;

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-right: 0.5rem;

  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  & span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
  }

  & span:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  & input:checked + span {
    background-color: #2196f3;
  }

  & input:focus + span {
    box-shadow: 0 0 1px #2196f3;
  }

  & input:checked + span:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;
