import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BackToRoot = ({ text }) => {
  return (
    <div className='goBackButton'>
      <Link to='/'>
        <button className='goBackButton__button'>{text}</button>
      </Link>
    </div>
  );
};

BackToRoot.propTypes = {
  text: PropTypes.string.isRequired
};

export default BackToRoot;
