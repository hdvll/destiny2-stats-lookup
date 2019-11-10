import React from 'react';

const LoadingData = ({ platformDisplayName, platform }) => {
  return (
    <div>
      <div className='searching-spinner'>
        <div>
          <i
            className={`fab fa-${platformDisplayName(
              parseInt(platform)
            )} spinner-animate`}
          />
        </div>
        <span>Hang on, we're fetching your guardian data</span>
      </div>
    </div>
  );
};

export default LoadingData;
