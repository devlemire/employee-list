import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      // <div id="header-container">
      <div className="titleBar">
        <span className="titleText"> Employee Manager </span>
      </div>
    )
  }
}

export default Header;