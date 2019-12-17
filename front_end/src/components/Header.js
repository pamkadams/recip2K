import React, { Component } from "react";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <nav>
      <NavLink exact activeClassName="active" to="/">
        Home
      </NavLink>
      <NavLink exact activeClassName="active" to="/add">
        Add
      </NavLink>
      <NavLink exact activeClassName="active" to="/search">
        Search
      </NavLink>
    </nav>
  );
}

export default Header;
