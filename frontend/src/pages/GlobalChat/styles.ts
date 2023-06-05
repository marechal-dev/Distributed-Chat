import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  `

export const Chat = styled.div`
width: 100%;
max-width: 1280px;
height: 100vh;
margin: 0 auto;
`
export const Header = styled.div`
  position: fixed;
  max-width: 1280px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
  background-color:#322C43;
  font-size: 2rem;

  height: 4rem;
  width: 100%;
  
  #buttonBack{
    position: absolute;
    left: 10px;
  }

`
export const Logo = styled.div`
margin: 0 auto;

`
export const Main = styled.div`
overflow-y: auto;
flex: 1;
padding-top: 5rem;
padding-bottom: 5rem;
margin: 0 1rem;
`
export const Footer = styled.div`
  max-width: 1280px;
  display: flex;
  align-items: center;
  background-color: #322C43 ;
  padding: 0.7rem 0.5rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 4rem;
  gap: 1rem;
  >input {
    width: 100%;
    background-color: #201C2B;
    border: none;
    border-radius: 0.5rem;
    height: 100%;
    color: white;
    padding: 0.5rem;
  }
  >button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 100%;
    border: none;
    border-radius: 0.5rem;
    background-color: #912CA8;
    color: white;
    font-size: 1.5rem;
  }
  `