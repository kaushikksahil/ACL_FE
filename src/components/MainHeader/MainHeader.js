import React from "react";

import Navigation from "./Navigation";

const MainHeader = (props) => {
  return (
    <header className="main-header">
      <h1>Access Control Demo</h1>
      <Navigation
        isLoggedIn={props.isAuthenticated}
        onLogout={props.onLogout}
      />
    </header>
  );
};

export default MainHeader;
