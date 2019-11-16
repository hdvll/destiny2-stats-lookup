import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import MenuHeading from '../heading/MenuHeading';

const Menu = ({ deleteSessionData }) => {
  const cookies = new Cookies();

  const membershipData = JSON.parse(
    sessionStorage.getItem('OAuthMemberShipData')
  );

  const signedInToken = cookies.get('bungieAuth');

  const [menuOpen, setMenuOpen] = useState(false);
  let menuState;

  if (menuOpen) {
    menuState = 'open';
  } else {
    menuState = 'closed';
  }

  return (
    menuState && (
      <nav className='navigation'>
        <div className={`menu ${menuState}`}>
          <button
            className={`menu__navBtn ${menuState}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`menu__navBtn--hamburger ${menuState}`}></span>
          </button>
          <MenuHeading />
          <div className='menu__divider'>
            <span className='menu__divider--line'></span>
          </div>
          <ul className='menu__list'>
            <div className='menu__list--top'>
              <li
                className='menu__list--item'
                onClick={() => setMenuOpen(false)}
              >
                <Link to='/' className='navLink'>
                  <i className='fas fa-search'></i> Search
                </Link>
              </li>
              <li
                className='menu__list--item'
                onClick={() => setMenuOpen(false)}
              >
                <Link to='/oauth' className='navLink'>
                  {signedInToken && membershipData ? (
                    <>
                      <i className='fas fa-chart-pie'></i> My Stats (
                      {membershipData.displayName})
                    </>
                  ) : (
                    <>
                      <i className='fas fa-unlock-alt'></i> Sign in with Bungie
                    </>
                  )}
                </Link>
              </li>
              <li
                className='menu__list--item'
                onClick={() => setMenuOpen(false)}
              >
                <Link to='/about' className='navLink'>
                  <i className='fas fa-info-circle'></i> About the site
                </Link>
              </li>
              <div className='menu__list--bottom'>
                {signedInToken && (
                  <li
                    className='menu__list--item last-item'
                    onClick={() => setMenuOpen(false)}
                  >
                    <span
                      onClick={() => deleteSessionData()}
                      className='navLink'
                    >
                      <i className='fas fa-sign-out-alt'></i> Forget my data
                    </span>
                  </li>
                )}
              </div>
            </div>
          </ul>
        </div>
      </nav>
    )
  );
};

Menu.propTypes = {
  deleteSessionData: PropTypes.func.isRequired
};

export default Menu;
