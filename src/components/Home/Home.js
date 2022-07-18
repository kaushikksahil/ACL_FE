import React, { useState } from "react";
import About from "../About/About";
import Login from "../Login/Login";
import Signup from "../SignUp/Signup";

const Home = (props) => {
  const [isSignupSelected, setSignupSelected] = useState(false);

  const isSignUp = () => {
    setSignupSelected(!isSignupSelected);
  };

  return (
    <div className="row c-row">
      <div className="col">
        <About />
      </div>
      <div className="col">
        {!isSignupSelected ? (
          <Login signUpSelect={isSignUp} />
        ) : (
          <Signup signUpSelect={isSignUp} />
        )}
      </div>
    </div>
  );
};

export default Home;
