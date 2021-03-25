import styled from 'styled-components';
import Background from '../../images/wallpaper.png';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  width: 100%;
  height: 100%;
  @media (max-width: 576px) {
    grid-template-columns: 100%;
  }
  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
  @media (max-width: 992px) {
    grid-template-columns: 100%;
  }
`;

export const Image = styled.image`
  width: 100%;
  height: 100%;
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  @media (max-width: 576px) {
    display: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 992px) {
    display: none;
  }
`;

export const Login = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--color-primary);
`;
export const Title = styled.h1`
  color: var(--color-text-clear);
`;
export const InputStyle = styled.input`
  transition: ease 0.6s;
  width: 360px;
  background: var(--color-text-clear);
  border: 2px solid rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  border-radius: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  margin-bottom: 34px;
  @media (max-width: 576px) {
    width: 80%;
  }
  @media (max-width: 768px) {
    width: 80%;
  }
  @media (max-width: 992px) {
    width: 80%;
  }
  :focus {
    transition: ease 0.6s;
    border: 2px solid rgba(67, 194, 247, 0.75);
  }
`;

export const InputStyleError = styled.input`
  transition: ease 0.6s;
  width: 360px;
  background: var(--color-text-clear);
  border: 2px solid rgba(255, 35, 35, 0.75);
  box-sizing: border-box;
  border-radius: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  margin-bottom: 34px;
  @media (max-width: 576px) {
    width: 80%;
  }
  @media (max-width: 768px) {
    width: 80%;
  }
  @media (max-width: 992px) {
    width: 80%;
  }
  :focus {
    transition: ease 0.6s;
    border: 2px solid rgba(255, 35, 35, 0.75);
  }
`;

export const ButtonStyle = styled.input`
  transition: ease 0.6s;
  color: var(--color-text-clear);
  background: var(--color-button);
  border: 2px solid rgba(0, 0, 0, 0.36);
  box-sizing: border-box;
  border-radius: 3px;
  width: 220px;
  height: 36px;
  :hover {
    background: ${darken(0.1, 'rgb(67, 194, 247)')};
    border: 2px solid ${lighten(0.6, 'rgba(0, 0, 0, 0.36)')};
    transition: ease 0.6s;
  }
`;
