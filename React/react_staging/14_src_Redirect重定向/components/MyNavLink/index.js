import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class MyNavLink extends Component {
  render() {
    const {props} = this
    return (
        <NavLink activeClassName="demo" className="list-group-item" {...props}/>
    );
  }
}

export default MyNavLink;
