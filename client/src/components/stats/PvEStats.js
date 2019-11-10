import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getWeaponKillsArr } from '../../containers/stats/WeaponKillsArray';

const PvEStats = ({ allPvE: { allTime } }) => {
  const [displayPvEStats, toggleDisplayPvEStats] = useState(false);

  return !allTime ? (
    <>
      <div className='stats'>
        <div className='statsHeader'>PvE Stats</div>
        <div className='statsGroup pveStatsGroup'>
          <div className='statsGroup__row'>
            <span className='statsGroup__row--label'>
              No PvE stats available...
            </span>
          </div>
        </div>
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
          <span className='stats__heading'>General stats</span>
          <div className='statsGroup pveStatsGroup'>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Time spent in PvE</span>
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
                {allTime.heroicPublicEventsCompleted &&
                  (
                    (allTime.heroicPublicEventsCompleted.basic.value /
                      allTime.publicEventsCompleted.basic.value) *
                    100
                  ).toFixed(2)}
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
          </div>
          <span className='stats__heading'>Kills & Deaths</span>
          <div className='statsGroup pveStatsGroup'>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Opponents Defeated</span>
              <span className='statsGroup__row--value'>
                {(
                  allTime.opponentsDefeated &&
                  allTime.opponentsDefeated.basic.value
                ).toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Precision kills %</span>
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
              <span className='statsGroup__row--label'>Longest kill spree</span>
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
      )}
    </>
  );
};

PvEStats.propTypes = {
  allPvE: PropTypes.object.isRequired
};

export default PvEStats;
