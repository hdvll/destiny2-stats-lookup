export const getWeaponKillsArr = (gameType, sort) => {
  // Check if sessionStorage containt the profile
  if (sessionStorage.getItem('profileStats')) {
    // Get data from session storage
    const data = JSON.parse(sessionStorage.getItem('profileStats'));
    // Set the type of data that is to be fetched
    let gameTypeData;
    switch (gameType) {
      case 'pvp':
        gameTypeData = data.allPvP.allTime;
        break;
      case 'pve':
        gameTypeData = data.allPvE.allTime;
        break;
      case 'gambit':
        gameTypeData = data.allPvECompetitive.allTime;
        break;
      case 'raid':
        gameTypeData = data.raid.allTime;
        break;
      case 'story':
        gameTypeData = data.story.allTime;
        break;
      case 'strikes':
        gameTypeData = data.allStrikes.allTime;
        break;
      default:
        break;
    }
    // Create an array from the results
    const stats = Object.values(gameTypeData);

    // Filter out all weapon and ability kills
    const weaponsArr = stats.filter(
      stat => stat.statId.substr(0, 11) === 'weaponKills'
    );

    // Sort based on input parameters. Default is descending.
    if (sort === 'desc') {
      return weaponsArr.sort(
        (a, b) => parseFloat(b.basic.value) - parseFloat(a.basic.value)
      );
    } else if (sort === 'asc') {
      return weaponsArr.sort(
        (a, b) => parseFloat(a.basic.value) - parseFloat(b.basic.value)
      );
    } else {
      return weaponsArr;
    }
  }
};
