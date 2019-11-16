import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import Characters from '../../components/stats/Characters';

const ProfileStats = ({ profile, platformDisplayName, characters }) => {
  return (
    <div className='profile'>
      <div className='profileStats'>
        <div className='profileStats__heading'>
          <div className='profileStats__heading--userName'>
            {profile.userInfo.displayName}
          </div>
          <div className='profileStats__heading--dateLastPlayed'>
            <span>Last played:</span>
            <Moment format='DD/MM/YYYY'>{profile.dateLastPlayed}</Moment>
          </div>
        </div>
        <div className='profileStats__platform'>
          <i
            className={`fab fa-${platformDisplayName(
              profile.userInfo.membershipType
            )}`}
          ></i>
        </div>
      </div>
      <Characters characters={characters} />
    </div>
  );
};

ProfileStats.propTypes = {
  profile: PropTypes.object.isRequired,
  platformDisplayName: PropTypes.func.isRequired
};

export default ProfileStats;
