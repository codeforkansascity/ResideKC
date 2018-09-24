import React, { Component } from 'react';
import logo from '../assets/residekc_logo.svg'

export class Logo extends Component {
  render() {
    return (
      <div className="container" id="body">
        <img src={logo} alt="ResideKC Logo" className='logo' />
      </div>
    );
  }
}
