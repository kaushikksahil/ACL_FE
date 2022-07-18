import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Card from "../UI/Card/Card";
import TextInput from "../common/TextInput";
import UserAPI from "../../api/user";
import { UserContext } from "../../context/create";
import jwt_decode from "jwt-decode";

const Login = (props) => {
  const [error, setError] = useState({});
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const { userData, setUserData } = useContext(UserContext);
  const [invalidCred, setInvalidCred] = useState(false);
  const [invalidCredError, setInvalidCredError] = useState("");

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formValidation()) {
      return;
    } else {
      UserAPI.login(loginCredentials).then((response) => {
        const user = jwt_decode(response.token);
        if (user && user.data.status === 422) {
          setError({ [user.data.field]: user.data.message });
        } else if (user.data.status === 404) {
          setInvalidCred(true);
          setInvalidCredError(user.data.message);
        } else if (user.data) {
          localStorage.setItem("token", response.token);
          setUserData(user.data);
          return history.push("/product");
        } else {
          alert(
            "Internal error occured, Please connect with System Administrator"
          );
        }
      });
    }
  };

  const formValidation = () => {
    let _error = {};
    if (!loginCredentials.email) _error.email = "Please fill Email";
    if (!loginCredentials.password) _error.password = "Please fill Password";
    if (!loginCredentials.email.includes("@"))
      _error.userName = "Please provide valid email";
    setError(_error);
    return Object.keys(_error).length === 0;
  };

  const onChangeHandler = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div class="col d-flex justify-content-center">
      <Card className="card-form">
        <p className="c-p">Please login to your account</p>
        <form onSubmit={onSubmit}>
          <div className="row form-div">
            <div className="col form-col">
              <TextInput
                id="email"
                label="Email"
                name="email"
                type="email"
                onChange={onChangeHandler}
                value={loginCredentials.email}
                error={error.email}
              />
            </div>
          </div>
          <div className="row form-div">
            <div className="col form-col">
              <TextInput
                id="password"
                label="Password"
                name="password"
                type="password"
                onChange={onChangeHandler}
                value={loginCredentials.password}
                error={error.password}
              />
            </div>
          </div>
          {invalidCred && <p>{invalidCredError}</p>}
          <div className="col form-col">
            <div className="row" style={{ margin: "15px" }}>
              <div class="d-flex justify-content-center">
                <input type="submit" value="Login" className="form-sub-btn" />
              </div>
            </div>
          </div>
        </form>
        <div class="text-center">
          <p>
            Not a member?{" "}
            <Link to="#" onClick={props.signUpSelect}>
              Register
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
