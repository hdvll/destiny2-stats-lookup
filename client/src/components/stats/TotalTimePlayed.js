export const getTotalPlayTime = () => {
  const data = JSON.parse(sessionStorage.getItem('characters'));
  const charArr = Object.values(data);

  let totalPlayTime = 0;

  charArr.map(character => {
    totalPlayTime = totalPlayTime + parseInt(character.minutesPlayedTotal);
    return totalPlayTime;
  });

  return Math.round(totalPlayTime / 60).toLocaleString();
};
