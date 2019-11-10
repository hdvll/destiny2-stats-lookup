import React from 'react';
import PropTypes from 'prop-types';

const ProfileFetchError = ({ errorText }) => {
  return (
    <div class='errors__profile-fetch'>
      Profile error: <span>{errorText}</span>
    </div>
  );
};

ProfileFetchError.propTypes = {
  errorText: PropTypes.string.isRequired
};

export default ProfileFetchError;
