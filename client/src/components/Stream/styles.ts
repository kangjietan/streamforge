import styled from 'styled-components';

export const StreamContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

export const StreamInformationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const CurrentStreamer = styled.h1`
  color: var(--primary-text-color);
`;

export const GoToStreamButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  font-size: 14px;
  padding-right: 24px;
  padding-left: 24px;
  line-height: inherit;
  text-decoration: none;
  cursor: pointer;
  color: var(--primary-text-color);
  font-weight: 600;
  border-radius: 6px;
  box-shadow: inset 0 0 20px 20px transparent;
  background-color: #6441a4;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: inset 0 0 20px 20px rgba(0, 0, 0, 0.1);
  }
`;

export const GoBackStream = styled(GoToStreamButton)`
  background-color: red;
`;

export const SkipStream = styled(GoToStreamButton)`
  background-color: #3c5ccf;
`;