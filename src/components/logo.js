import React from 'react';
import logo from '../assets/residekc_logo.svg'

const Logo = () => {
    return (
      <div className="container" id="body">
        <img src={logo} alt="ResideKC Logo" className='logo' />
      </div>
    )
}

export default Logo;
