import React, { useState } from "react";
import app from "../../firebase/firebase.init";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Login = () => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const [logIn, setLogIn] = useState(null);

  //   ! Google Authentication

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        setLogIn(loggedInUser);
        console.log(loggedInUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  //   ! sign out
  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        setLogIn(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //   ! GitHub login authentication

  const gitHubProvider = new GithubAuthProvider();

  const handleGitHubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        const loggedInUser = result.user;
        setLogIn(loggedInUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  //   ! Twitter react authentication
  const twitterProvider = new TwitterAuthProvider();
  const handleTwitterSignIn = () => {
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
        const loggedInUser = result.user;
        setLogIn(loggedInUser);
        console.log(loggedInUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div style={{ textAlign: "center", margin: "210px 0px" }}>
      <div>
        {logIn ? (
          <button onClick={handleSignOut}>Sign Out</button>
        ) : (
          <>
            <button onClick={handleGoogleSignIn}>Google</button>
            <button onClick={handleGitHubSignIn}>GitHub</button>
            <button onClick={handleTwitterSignIn}>Twitter</button>
          </>
        )}
      </div>
      {logIn && (
        <div>
          <h2>Name: {logIn.displayName}</h2>
          <p>Email: {logIn.email}</p>
          <img src={logIn.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
