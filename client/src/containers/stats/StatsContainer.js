import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Heading from '../../components/heading/Heading';
import LoadingData from '../../components/loading/LoadingData';
import BackToRoot from '../../components/buttons/BackToRoot';
import ProfileFetchError from '../../components/errors/ProfileFetchError';
import ProfileStats from '../../components/stats/ProfileStats';
import ProfileHighlights from '../../components/stats/ProfileHighlights';
import Characters from '../../components/stats/Characters';
import PvPStats from '../../components/stats/PvPStats';
import PvEStats from '../../components/stats/PvEStats';
import GambitStats from '../../components/stats/GambitStats';

const StatsContainer = ({ match, platformDisplayName }) => {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState(
    JSON.parse(sessionStorage.getItem('profile'))
  );
  const [characters, setCharacters] = useState(
    JSON.parse(sessionStorage.getItem('characters'))
  );
  const [profileStats, setprofileStats] = useState(
    JSON.parse(sessionStorage.getItem('profileStats'))
  );

  const [error, setError] = useState();

  useEffect(() => {
    if (
      (profile !== null &&
        !(
          profile.userInfo.membershipId === match.params.membershipId &&
          profile.userInfo.membershipType.toString() ===
            match.params.membershipType
        )) ||
      !profile
    ) {
      setLoading(true);
      getProfileInfo()
        .then(() => getProfileStats())
        .then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const getProfileInfo = async () => {
    await axios
      .get(
        `/api/profile/${match.params.membershipType}/${match.params.membershipId}`
      )
      .then(res => {
        // Store profile response in local storage
        sessionStorage.setItem(
          'profile',
          JSON.stringify(res.data.Response.profile.data)
        );
        // Store character response in local storage
        sessionStorage.setItem(
          'characters',
          JSON.stringify(res.data.Response.characters.data)
        );
        // Set local profile state
        setProfile(res.data.Response.profile.data);
        // Set local characters state
        setCharacters(res.data.Response.characters.data);
      })
      .catch(err => {
        if (err.response.data.error.ErrorStatus) {
          // Remove all previous items from local storage
          sessionStorage.removeItem('profile');
          sessionStorage.removeItem('characters');
          sessionStorage.removeItem('profileStats');
          // Set error status in the error state
          setError(err.response.data.error.ErrorStatus);
          // Stop the page from loading and show error instead
          setLoading(false);
        }
        throw err;
      });
  };

  const getProfileStats = async () => {
    await axios
      .get(
        `/api/stats/${match.params.membershipType}/${match.params.membershipId}/0`
      )
      .then(res => {
        // Store profile response in local storage
        sessionStorage.setItem(
          'profileStats',
          JSON.stringify(res.data.Response)
        );
        // Set local profile state
        setprofileStats(res.data.Response);
      });
  };

  return (
    <div className='container'>
      <Heading />
      {!loading ? (
        !error ? (
          <>
            <ProfileStats
              profile={profile}
              platformDisplayName={platformDisplayName}
            />
            <ProfileHighlights profile={profile} profileStats={profileStats} />
            <Characters characters={characters} />
            <PvPStats allPvP={profileStats.allPvP} />
            <PvEStats allPvE={profileStats.allPvE} />
            <GambitStats allPvECompetitive={profileStats.allPvECompetitive} />
          </>
        ) : (
          <ProfileFetchError errorText={error} />
        )
      ) : (
        <LoadingData
          platformDisplayName={platformDisplayName}
          platform={match.params.membershipType}
        />
      )}
      <BackToRoot text='Back to search results' />
    </div>
  );
};

StatsContainer.propTypes = {
  platformDisplayName: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default StatsContainer;
