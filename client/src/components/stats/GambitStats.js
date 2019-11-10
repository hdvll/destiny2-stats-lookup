import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getWeaponKillsArr } from '../../containers/stats/WeaponKillsArray';

const GambitStats = ({ allPvECompetitive: { allTime } }) => {
  const [displayGambitStatsStats, toggleDisplayGambitStatsStats] = useState(
    false
  );

  return !allTime ? (
    <>
      <div className='stats'>
        <div className='statsHeader'>Gambit Stats</div>
        <div className='statsGroup gambitStatsGroup'>
          <div className='statsGroup__row'>
            <span className='statsGroup__row--label'>
              No Gambit stats available...
            </span>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className='statsSection'>
        <div className='statsHeader'>Gambit Stats</div>
        {!displayGambitStatsStats ? (
          <div
            className='statsDisplay'
            onClick={() =>
              toggleDisplayGambitStatsStats(!displayGambitStatsStats)
            }
          >
            Show stats +
          </div>
        ) : (
          <div
            className='statsDisplay'
            onClick={() =>
              toggleDisplayGambitStatsStats(!displayGambitStatsStats)
            }
          >
            Hide stats &mdash;
          </div>
        )}
      </div>
      {displayGambitStatsStats && (
        <div className='stats'>
          <span className='stats__heading'>General stats</span>
          <div className='statsGroup gambitStatsGroup'>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>
                Time spent in Gambit
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
              <span className='statsGroup__row--label'>Games played</span>
              <span className='statsGroup__row--value'>
                {allTime.activitiesEntered &&
                  allTime.activitiesEntered.basic.value.toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Games won %</span>
              <span className='statsGroup__row--value'>
                {allTime.activitiesEntered &&
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
              <span className='statsGroup__row--label'>Primeval damage</span>
              <span className='statsGroup__row--value'>
                {allTime.primevalDamage &&
                  allTime.primevalDamage.basic.value.toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Invasions</span>
              <span className='statsGroup__row--value'>
                {allTime.invasions &&
                  allTime.invasions.basic.value.toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Motes picked up</span>
              <span className='statsGroup__row--value'>
                {allTime.motesPickedUp &&
                  allTime.motesPickedUp.basic.value.toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Motes deposited</span>
              <span className='statsGroup__row--value'>
                {allTime.motesDeposited &&
                  allTime.motesDeposited.basic.value.toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Motes lost</span>
              <span className='statsGroup__row--value'>
                {allTime.motesLost &&
                  allTime.motesLost.basic.value.toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Motes denied</span>
              <span className='statsGroup__row--value'>
                {allTime.motesDenied &&
                  allTime.motesDenied.basic.value.toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Blockers sent</span>
              <span className='statsGroup__row--value'>
                {allTime.smallBlockersSent &&
                  allTime.mediumBlockersSent &&
                  allTime.largeBlockersSent &&
                  (
                    allTime.smallBlockersSent.basic.value +
                    allTime.mediumBlockersSent.basic.value +
                    allTime.largeBlockersSent.basic.value
                  ).toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Small blockers %</span>
              <span className='statsGroup__row--value'>
                {allTime.smallBlockersSent &&
                  (
                    (allTime.smallBlockersSent.basic.value /
                      (allTime.smallBlockersSent.basic.value +
                        allTime.mediumBlockersSent.basic.value +
                        allTime.largeBlockersSent.basic.value)) *
                    100
                  )
                    .toFixed(2)
                    .toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Medium blockers %</span>
              <span className='statsGroup__row--value'>
                {allTime.mediumBlockersSent &&
                  (
                    (allTime.mediumBlockersSent.basic.value /
                      (allTime.smallBlockersSent.basic.value +
                        allTime.mediumBlockersSent.basic.value +
                        allTime.largeBlockersSent.basic.value)) *
                    100
                  )
                    .toFixed(2)
                    .toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Large blockers %</span>
              <span className='statsGroup__row--value'>
                {allTime.largeBlockersSent &&
                  (
                    (allTime.largeBlockersSent.basic.value /
                      (allTime.smallBlockersSent.basic.value +
                        allTime.mediumBlockersSent.basic.value +
                        allTime.largeBlockersSent.basic.value)) *
                    100
                  )
                    .toFixed(2)
                    .toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Orbs generated</span>
              <span className='statsGroup__row--value'>
                {allTime.orbsDropped &&
                  allTime.orbsDropped.basic.value.toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Orbs picked up</span>
              <span className='statsGroup__row--value'>
                {allTime.orbsGathered &&
                  allTime.orbsGathered.basic.value.toLocaleString()}
              </span>
            </div>
          </div>
          <span className='stats__heading'>Kills & Deaths</span>
          <div className='statsGroup gambitStatsGroup'>
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
              <span className='statsGroup__row--label'>Invasion kills</span>
              <span className='statsGroup__row--value'>
                {allTime.invasionKills &&
                  allTime.invasionKills.basic.value.toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>
                Avg. kills per invation
              </span>
              <span className='statsGroup__row--value'>
                {allTime.invasionKills &&
                  (
                    allTime.invasionKills.basic.value /
                    allTime.invasions.basic.value
                  )
                    .toFixed(2)
                    .toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Invasion deaths</span>
              <span className='statsGroup__row--value'>
                {allTime.invasionDeaths &&
                  allTime.invasionDeaths.basic.value.toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Invaders killed</span>
              <span className='statsGroup__row--value'>
                {allTime.invaderKills &&
                  allTime.invaderKills.basic.value.toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Deaths by invaders</span>
              <span className='statsGroup__row--value'>
                {allTime.invaderDeaths &&
                  allTime.invaderDeaths.basic.value.toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Primevals killed</span>
              <span className='statsGroup__row--value'>
                {allTime.primevalKills &&
                  allTime.primevalKills.basic.value.toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Blockers killed</span>
              <span className='statsGroup__row--value'>
                {allTime.blockerKills &&
                  allTime.blockerKills.basic.value.toLocaleString()}
              </span>
            </div>
            <div className='statsGroup__row'>
              <span className='statsGroup__row--label'>Mobs killed</span>
              <span className='statsGroup__row--value'>
                {allTime.mobKills &&
                  allTime.mobKills.basic.value.toLocaleString()}
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
          <div className='statsGroup gambitStatsGroup'>
            {getWeaponKillsArr('gambit', 'desc').map((weapon, index) => (
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

GambitStats.propTypes = {
  allPvECompetitive: PropTypes.object.isRequired
};

export default GambitStats;
