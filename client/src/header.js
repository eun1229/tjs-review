import { useEffect, useState, useContext } from "react";
import {Link} from "react-router-dom";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  let username = userInfo?.username;

  let headerbody = <>
    <Link to = "/login">Login</Link>
    <Link to = "/register">Register</Link>
  </>;

  if (username) {
    headerbody = <>
      <Link to = "/create">Create new review</Link>
      <a onClick = {logout}>Logout ({username})</a>
    </>
  }

  return <>
    <header>
      <Link className = "logo" to = "/">Trader Joe's Review</Link>
      <nav>
        {headerbody}
      </nav>
    </header>
  </>
}