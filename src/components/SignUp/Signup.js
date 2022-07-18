import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Card from "../UI/Card/Card";
import TextInput from "../common/TextInput";
import Dropdown from "../common/Dropdown";
import RoleAPI from "../../api/masterApi";
import UserAPI from "../../api/user";
import { UserContext } from "../../context/create";

const Signup = (props) => {
  const [systemRoles, setSystemRoles] = useState([]);
  const [error, setError] = useState({});
  const [user, setUser] = useState({
    userName: "",
    password: "",
    role: null,
  });
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    RoleAPI.getRole().then((response) => {
      setSystemRoles(response.data);
    });
  }, []);

  const formValidation = () => {
    let _error = {};
    if (!user.userName) _error.userName = "Please fill User Name";
    if (!user.password) _error.password = "Please fill Password";
    if (!user.userName.includes("@"))
      _error.userName = "Please provide valid email";
    if (user.password.trim().length < 3)
      _error.password = "Password should have more than 2 characters ";
    if (!user.role) _error.role = "Please provide Role";
    setError(_error);
    return Object.keys(_error).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formValidation()) {
      return;
    } else {
      UserAPI.signUp(user).then((response) => {
        const user = jwt_decode(response.token);
        if (user && user.data.status === 422) {
          setError({ [user.data.field]: user.data.message });
        } else if (user) {
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

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div class="col d-flex justify-content-center">
      <Card className="card-form">
        <p className="c-p">Create Your Account</p>
        <form onSubmit={onSubmit}>
          <div className="row form-div">
            <div className="col form-col">
              <TextInput
                id="userName"
                label="User Name"
                name="userName"
                type="text"
                onChange={onChangeHandler}
                value={user.userName}
                error={error.userName}
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
                value={user.password}
                error={error.password}
              />
            </div>
          </div>
          <div className="row form-div">
            <div className="col form-col">
              <Dropdown
                id="role"
                name="role"
                label="Role"
                value={user.role}
                onChange={onChangeHandler}
                options={systemRoles}
                error={error.role}
              />
            </div>
          </div>
          <div className="col form-col">
            <div className="row" style={{ margin: "15px" }}>
              <div class="d-flex justify-content-center">
                <input type="submit" value="Sign Up" className="form-sub-btn" />
              </div>
            </div>
          </div>
        </form>
        <div class="text-center">
          <p>
            Already a member?{" "}
            <Link to="#" onClick={props.signUpSelect}>
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
