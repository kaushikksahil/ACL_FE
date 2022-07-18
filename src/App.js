import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import MainHeader from "./components/MainHeader/MainHeader";
import Home from "./components/Home/Home";
import Signup from "./components/SignUp/Signup";
import Product from "./components/Product/Product";

function App() {
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sign-up" exact component={Signup} />
            <Route path="/product" exact component={Product} />
          </Switch>
        </BrowserRouter>
      </main>
    </React.Fragment>
  );
}

export default App;
