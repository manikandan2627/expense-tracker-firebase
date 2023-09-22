import React from 'react';
import styled from 'styled-components';
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../config/firebase-config'
import { Navigate, useNavigate } from 'react-router-dom'
import { useGetUserInfo } from '../../hooks/useGetUserInfo'


export const Auth = () => {

  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();


  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: result.user.uid,
      name: result.user.displayName,
      profilePhoto: result.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo))
    navigate("/expense-tracker")
  }

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }


  return (
    <Container>
      <Left>
        <h1>Welcome to Expense Tracker</h1>
        <p>Track and manage your expenses with ease.</p>
      </Left>
      <Right>

        <SignInButton onClick={signInWithGoogle}>Sign In With Google</SignInButton>
      </Right>
    </Container>
  )
}


// Styled components for the Google login form
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 80vw;
  margin: auto;
text-align: left; 

@media only screen and (max-width: 800px) {
  flex-direction: column;
  width: 100%;
  height: 50vh;
  
}
`;

const SignInButton = styled.button`
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357ae8;
  }
`;

const Right = styled.div`

`
const Left = styled.div`
padding: 20px;
width: 50%;
background-color: #ffffff;
  border-radius: 8px;
    border: 4px solid #000;
  border-radius: 6px;-webkit-box-shadow: 11px 11px 0px -3px rgba(0,0,0,0.75);
-moz-box-shadow: 11px 11px 0px -3px rgba(0,0,0,0.75);
box-shadow: 11px 11px 0px -3px rgba(0,0,0,0.75);
h1{
  font-size: 52px;
  
}

p{
  font-size: 22px;
}

@media only screen and (max-width: 600px) {
h1{
  font-size: 32px;
  
}

p{
  font-size: 16px;
}
}
`
