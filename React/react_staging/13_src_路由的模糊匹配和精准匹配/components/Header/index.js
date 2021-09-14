import React, {Component} from 'react';

class Header extends Component {
  render() {
    console.log("Header收到的props是", this.props)
    const {props} = this
    return (
        <div>
          <h5>props是{props.a}</h5>
        </div>
    );
  }
}

export default Header;
