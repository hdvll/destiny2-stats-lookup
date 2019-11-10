import React from 'react';
import PropTypes from 'prop-types';
import PvPIcon from '../../imgs/pvp-icon.png';
import RaidIcon from '../../imgs/raid-icon.png';
import PvEIcon from '../../imgs/pve-icon.png';
import StrikeIcon from '../../imgs/strikes-icon.png';
import GambitIcon from '../../imgs/gambit-icon.png';
import GeneralIcon from '../../imgs/general-icon.png';
import { getTotalPlayTime } from './TotalTimePlayed';

const ProfileHighlights = ({ profileStats }) => {
  return (
    <>
      <div className='statsHeader'>Highlights</div>
      <div className='profileHighlights'>
        <div className='profileHighlights__box statBox__pvp'>
          <img
            className='statBox__icon'
            src={PvPIcon}
            alt='PvP icon backgound'
          />
          <div className='statBox__header'>PvP K/D</div>
          <div className='statBox__text'>
            {!profileStats.allPvP.allTime ? (
              <span>&mdash;</span>
            ) : (
              profileStats.allPvP.allTime.killsDeathsRatio.basic.displayValue
            )}
          </div>
        </div>
        <div className='profileHighlights__box statBox__raid'>
          <img
            className='statBox__icon'
            src={RaidIcon}
            alt='Raid icon backgound'
          />
          <div className='statBox__header'>Raid clears</div>
          <div className='statBox__text'>
            {!profileStats.raid.allTime ? (
              <span>&mdash;</span>
            ) : (
              parseInt(
                profileStats.raid.allTime.activitiesCleared.basic.displayValue
              ).toLocaleString()
            )}
          </div>
        </div>
        <div className='profileHighlights__box statBox__PvE'>
          <img
            className='statBox__icon'
            src={PvEIcon}
            alt='PvE icon backgound'
          />
          <div className='statBox__header'>PvE Suicides</div>
          <div className='statBox__text'>
            {!profileStats.allPvE.allTime ? (
              <span>&mdash;</span>
            ) : (
              parseInt(
                profileStats.allPvE.allTime.suicides.basic.displayValue
              ).toLocaleString()
            )}
          </div>
        </div>
        <div className='profileHighlights__box statBox__gambit'>
          <img
            className='statBox__icon'
            src={GambitIcon}
            alt='Gambit icon backgound'
          />
          <div className='statBox__header'>Motes Deposited</div>
          <div className='statBox__text'>
            {!profileStats.allPvECompetitive.allTime ? (
              <span>&mdash;</span>
            ) : (
              parseInt(
                profileStats.allPvECompetitive.allTime.motesDeposited.basic
                  .displayValue
              ).toLocaleString()
            )}
          </div>
        </div>
        <div className='profileHighlights__box statBox__strikes'>
          <img
            className='statBox__icon'
            src={StrikeIcon}
            alt='Strikes icon backgound'
          />
          <div className='statBox__header'>Kills in Strikes</div>
          <div className='statBox__text'>
            {!profileStats.allStrikes.allTime ? (
              <span>&mdash;</span>
            ) : (
              parseInt(
                profileStats.allStrikes.allTime.kills.basic.displayValue
              ).toLocaleString()
            )}
          </div>
        </div>
        <div className='profileHighlights__box statBox__general'>
          <img
            className='statBox__icon'
            src={GeneralIcon}
            alt='General icon backgound'
          />
          <div className='statBox__header'>Total hours in game</div>
          <div className='statBox__text'>{getTotalPlayTime()}</div>
        </div>
      </div>
    </>
  );
};

ProfileHighlights.propTypes = {
  profileStats: PropTypes.object.isRequired
};

export default ProfileHighlights;
