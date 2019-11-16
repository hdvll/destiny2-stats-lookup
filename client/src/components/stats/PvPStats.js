import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getWeaponKillsArr } from '../../containers/stats/WeaponKillsArray';

const PvPStats = ({ allPvP: { allTime } }) => {
  const [displayPvPStats, toggleDisplayPvPStats] = useState(true);

  return !allTime ? (
    <>
      <div className='statsHeader'>PvP Stats</div>
      <div
        style={{
          alignSelf: 'flex-start',
          fontStyle: 'italic',
          color: '#777',
          marginTop: '0.2rem'
        }}
      >
        No PVP stats available
      </div>
    </>
  ) : (
    <>
      <div className='statsSection'>
        <div className='statsHeader'>PvP Stats</div>
        {!displayPvPStats ? (
          <div
            className='statsDisplay'
            onClick={() => toggleDisplayPvPStats(!displayPvPStats)}
          >
            Show stats +
          </div>
        ) : (
          <div
            className='statsDisplay'
            onClick={() => toggleDisplayPvPStats(!displayPvPStats)}
          >
            Hide stats &mdash;
          </div>
        )}
      </div>
      {displayPvPStats && (
        <div className='stats'>
          <div className='stats__general'>
            <span className='stats__heading'>General stats</span>
            <div className='statsGroup pvpStatsGroup'>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>
                  Time spent in the Crucible
                </span>
                <span className='statsGroup__row--value'>
                  {allTime.secondsPlayed &&
                    allTime.secondsPlayed.basic.displayValue}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>Combat rating</span>
                <span className='statsGroup__row--value'>
                  {allTime.combatRating &&
                    allTime.combatRating.basic.value
                      .toFixed(2)
                      .toLocaleString()}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>K/D</span>
                <span className='statsGroup__row--value'>
                  {allTime.killsDeathsRatio &&
                    allTime.killsDeathsRatio.basic.value
                      .toFixed(2)
                      .toLocaleString()}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>K/D/A</span>
                <span className='statsGroup__row--value'>
                  {allTime.killsDeathsAssists &&
                    allTime.killsDeathsAssists.basic.value
                      .toFixed(2)
                      .toLocaleString()}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>Efficiency</span>
                <span className='statsGroup__row--value'>
                  {allTime.efficiency &&
                    allTime.efficiency.basic.value.toFixed(2).toLocaleString()}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>Win %</span>
                <span className='statsGroup__row--value'>
                  {allTime.activitiesEntered &&
                    allTime.activitiesWon &&
                    (
                      (allTime.activitiesWon.basic.value /
                        allTime.activitiesEntered.basic.value) *
                      100
                    )
                      .toFixed(2)
                      .toLocaleString()}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>Orbs generated</span>
                <span className='statsGroup__row--value'>
                  {allTime.orbsDropped && allTime.orbsDropped.basic.value}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>Orbs picked up</span>
                <span className='statsGroup__row--value'>
                  {allTime.orbsGathered && allTime.orbsGathered.basic.value}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>
                  Matches in a fireteam
                </span>
                <span className='statsGroup__row--value'>
                  {allTime.fireTeamActivities &&
                    allTime.fireTeamActivities.basic.value}
                </span>
              </div>
            </div>
          </div>
          <div className='stats__killsDeaths'>
            <span className='stats__heading'>Kills & Deaths</span>
            <div className='statsGroup pvpStatsGroup'>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>
                  Avg. kills per game
                </span>
                <span className='statsGroup__row--value'>
                  {allTime.activitiesEntered &&
                    allTime.kills &&
                    (
                      allTime.kills.basic.value /
                      allTime.activitiesEntered.basic.value
                    )
                      .toFixed(2)
                      .toLocaleString()}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>Total kills</span>
                <span className='statsGroup__row--value'>
                  {(
                    allTime.kills && allTime.kills.basic.value
                  ).toLocaleString()}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>
                  Precision kills %
                </span>
                <span className='statsGroup__row--value'>
                  {(
                    (allTime.kills &&
                      allTime.precisionKills &&
                      allTime.precisionKills.basic.value /
                        allTime.kills.basic.value) * 100
                  )
                    .toFixed(2)
                    .toLocaleString()}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>
                  Avg. deaths per game
                </span>
                <span className='statsGroup__row--value'>
                  {allTime.activitiesEntered &&
                    allTime.deaths &&
                    (
                      allTime.deaths.basic.value /
                      allTime.activitiesEntered.basic.value
                    )
                      .toFixed(2)
                      .toLocaleString()}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>Total deaths</span>
                <span className='statsGroup__row--value'>
                  {(
                    allTime.deaths && allTime.deaths.basic.value
                  ).toLocaleString()}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>Suicides</span>
                <span className='statsGroup__row--value'>
                  {(
                    allTime.suicides && allTime.suicides.basic.value
                  ).toLocaleString()}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>
                  Most kills in a game
                </span>
                <span className='statsGroup__row--value'>
                  {allTime.bestSingleGameKills &&
                    allTime.bestSingleGameKills.basic.value}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>
                  Resurrections performed
                </span>
                <span className='statsGroup__row--value'>
                  {allTime.resurrectionsPerformed &&
                    allTime.resurrectionsPerformed.basic.value}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>
                  Resurrections recieved
                </span>
                <span className='statsGroup__row--value'>
                  {allTime.resurrectionsReceived &&
                    allTime.resurrectionsReceived.basic.value}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>
                  Longest kill spree
                </span>
                <span className='statsGroup__row--value'>
                  {(
                    allTime.longestKillSpree &&
                    allTime.longestKillSpree.basic.value
                  ).toLocaleString()}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>
                  Longest single life
                </span>
                <span className='statsGroup__row--value'>
                  {allTime.longestSingleLife &&
                    allTime.longestSingleLife.basic.displayValue}
                </span>
              </div>
            </div>
          </div>
          <div className='stats__weapons'>
            <span className='stats__heading'>Weapon & ability kills %</span>
            <div className='statsGroup pvpStatsGroup'>
              {getWeaponKillsArr('pvp', 'desc').map((weapon, index) => (
                <div className='statsGroup__row' key={index}>
                  <span className='statsGroup__row--label'>
                    {weapon.statId.substr(11)}
                  </span>
                  <span className='statsGroup__row--value'>
                    {' '}
                    {((weapon.basic.value / allTime.kills.basic.value) * 100)
                      .toFixed(2)
                      .toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

PvPStats.propTypes = {
  allPvP: PropTypes.object.isRequired
};

export default PvPStats;
