import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ isSignedIn }) => {
    // TODO implement logout functionality
    if (isSignedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
      );
    } else {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <NavLink to={'/login'} className='f3 link dim black underline pa3 pointer'>
                Sign In
            </NavLink>
            <NavLink to={'/register'} className='f3 link dim black underline pa3 pointer'>
                Register
            </NavLink>
        </nav>
      );
    }
};

export default Navigation;