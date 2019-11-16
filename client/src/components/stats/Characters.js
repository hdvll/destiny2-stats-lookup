import React from 'react';
import PropTypes from 'prop-types';

const Characters = ({ characters }) => {
  const charArr = Object.values(characters);

  const charClassName = classNum => {
    let classDisplayName;
    if (classNum === 0) {
      classDisplayName = 'Titan';
    } else if (classNum === 1) {
      classDisplayName = 'Hunter';
    } else if (classNum === 2) {
      classDisplayName = 'Warlock';
    } else {
      classDisplayName = 'Unknown class';
    }
    return classDisplayName;
  };

  const charGenderName = genderNum => {
    let genderDisplayName;
    if (genderNum === 0) {
      genderDisplayName = 'Male';
    } else if (genderNum === 1) {
      genderDisplayName = 'Female';
    } else {
      genderDisplayName = 'Unknown';
    }
    return genderDisplayName;
  };

  const charRaceName = raceNum => {
    let raceDisplayName;
    if (raceNum === 0) {
      raceDisplayName = 'Human';
    } else if (raceNum === 1) {
      raceDisplayName = 'Awoken';
    } else if (raceNum === 2) {
      raceDisplayName = 'Exo';
    } else {
      raceDisplayName = 'Unknown';
    }
    return raceDisplayName;
  };

  return (
    <>
      <div className='characters'>
        {charArr.map(character => (
          <div className='character' key={character.characterId}>
            <img
              src={`https://www.bungie.net/${character.emblemBackgroundPath}`}
              className='character__emblem'
              alt='Character emblem background'
            />
            <div className='character__class'>
              <div className='character__class--classType'>
                {charClassName(character.classType)}
              </div>
              <div className='character__raceAndGender'>
                <span className='character__raceAndGender--raceType'>
                  {charRaceName(character.raceType)}
                </span>
                <span className='character__raceAndGender--genderType'>
                  {charGenderName(character.genderType)}
                </span>
              </div>
            </div>
            <div className='character__power'>
              <div className='character__power--power'>{character.light}</div>
              <div className='character__power--level'>
                Level {character.levelProgression.level}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

Characters.propTypes = {
  characters: PropTypes.object.isRequired
};

export default Characters;
