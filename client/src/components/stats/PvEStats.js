import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getWeaponKillsArr } from '../../containers/stats/WeaponKillsArray';

const PvEStats = ({ allPvE: { allTime }, allStrikes, patrol, story }) => {
  const [displayPvEStats, toggleDisplayPvEStats] = useState(true);

  return !allTime ? (
    <>
      <div className='statsHeader' style={{ marginTop: '1rem' }}>
        PvE Stats
      </div>
      <div
        style={{
          alignSelf: 'flex-start',
          fontStyle: 'italic',
          color: '#777',
          marginTop: '0.2rem'
        }}
      >
        No PvE stats available
      </div>
    </>
  ) : (
    <>
      <div className='statsSection'>
        <div className='statsHeader'>PvE Stats</div>
        {!displayPvEStats ? (
          <div
            className='statsDisplay'
            onClick={() => toggleDisplayPvEStats(!displayPvEStats)}
          >
            Show stats +
          </div>
        ) : (
          <div
            className='statsDisplay'
            onClick={() => toggleDisplayPvEStats(!displayPvEStats)}
          >
            Hide stats &mdash;
          </div>
        )}
      </div>
      {displayPvEStats && (
        <div className='stats'>
          <div className='stats__general'>
            <span className='stats__heading'>General stats</span>
            <div className='statsGroup pveStatsGroup'>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>
                  Time spent in PvE
                </span>
                <span className='statsGroup__row--value'>
                  {allTime.secondsPlayed &&
                    allTime.secondsPlayed.basic.displayValue}
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
                <span className='statsGroup__row--label'>Public events</span>
                <span className='statsGroup__row--value'>
                  {allTime.publicEventsCompleted &&
                    allTime.publicEventsCompleted.basic.value}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>
                  Heroic Public Events %
                </span>
                <span className='statsGroup__row--value'>
                  {allTime.heroicPublicEventsCompleted ? (
                    (
                      (allTime.heroicPublicEventsCompleted.basic.value /
                        allTime.publicEventsCompleted.basic.value) *
                      100
                    ).toFixed(2)
                  ) : (
                    <span>&mdash;</span>
                  )}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>
                  Adventures completed
                </span>
                <span className='statsGroup__row--value'>
                  {allTime.adventuresCompleted &&
                    allTime.adventuresCompleted.basic.value}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>
                  Strikes completed
                </span>
                <span className='statsGroup__row--value'>
                  {allStrikes.allTime.activitiesCleared &&
                    allStrikes.allTime.activitiesCleared.basic.value}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>Time in strikes</span>
                <span className='statsGroup__row--value'>
                  {allStrikes.allTime.secondsPlayed &&
                    allStrikes.allTime.secondsPlayed.basic.displayValue}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>Time in patrol</span>
                <span className='statsGroup__row--value'>
                  {patrol.allTime.secondsPlayed &&
                    patrol.allTime.secondsPlayed.basic.displayValue}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>
                  Time playing story
                </span>
                <span className='statsGroup__row--value'>
                  {story.allTime.secondsPlayed &&
                    story.allTime.secondsPlayed.basic.displayValue}
                </span>
              </div>
            </div>
          </div>
          <div className='stats__killsDeaths'>
            <span className='stats__heading'>Kills & Deaths</span>
            <div className='statsGroup pveStatsGroup'>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>
                  Opponents Defeated
                </span>
                <span className='statsGroup__row--value'>
                  {(
                    allTime.opponentsDefeated &&
                    allTime.opponentsDefeated.basic.value
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
                  Resurrections performed
                </span>
                <span className='statsGroup__row--value'>
                  {(
                    allTime.resurrectionsPerformed &&
                    allTime.resurrectionsPerformed.basic.value
                  ).toLocaleString()}
                </span>
              </div>
              <div className='statsGroup__row'>
                <span className='statsGroup__row--label'>
                  Resurrections recieved
                </span>
                <span className='statsGroup__row--value'>
                  {(
                    allTime.resurrectionsReceived &&
                    allTime.resurrectionsReceived.basic.value
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div className='stats__weapons'>
            <span className='stats__heading'>Weapon & ability kills %</span>
            <div className='statsGroup pveStatsGroup'>
              {getWeaponKillsArr('pve', 'desc').map((weapon, index) => (
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

PvEStats.propTypes = {
  allPvE: PropTypes.object.isRequired,
  allStrikes: PropTypes.object.isRequired,
  patrol: PropTypes.object.isRequired,
  story: PropTypes.object.isRequired
};

export default PvEStats;
