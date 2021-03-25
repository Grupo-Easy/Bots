import React, { useState, useEffect } from 'react';
import {
  Container,
  Login,
  Image,
  Title,
  InputStyle,
  ButtonStyle,
  InputStyleError,
} from './styles';
import api from '../../services/api';

function Home({ history }) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Incorrect, setIncorrect] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    api
      .get('/login', {
        auth: {
          username: Username,
          password: Password,
        },
      })
      .then((response) => {
        if (response.status === 401) {
          setIncorrect(true);
          console.log('???');
        } else if (response.status !== 200 || response.status !== 201) {
          history.push('/');
        }
        localStorage.setItem('jwt', response.data.token);
        history.push('/dashboard');
      })
      .catch((response) => {
        setIncorrect(true);
      });
  }

  return (
    <>
      <Container>
        <Image />
        <Login onSubmit={handleSubmit}>
          <Title>Login</Title>
          {!Incorrect && (
            <>
              <InputStyle
                placeholder="Username"
                type="text"
                value={Username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />
              <InputStyle
                placeholder="Password"
                type="password"
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </>
          )}
          {Incorrect && (
            <>
              <InputStyleError
                placeholder="Username"
                type="text"
                value={Username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />
              <InputStyleError
                placeholder="Password"
                type="password"
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </>
          )}
          <ButtonStyle type="submit" value="Login" />
        </Login>
      </Container>
    </>
  );
}

export default Home;
