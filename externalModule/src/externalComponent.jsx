import React from 'react';

export const ExternalComponent = ({React, BigButton}) => {
  const [clickedTimes, setClickedTimes] = React.useState(0);
  return (
    <div>
      <BigButton onClick={() => setClickedTimes(clickedTimes + 1)}>Button from the external module</BigButton>
      Clicked {clickedTimes} times
    </div>
  );
};
