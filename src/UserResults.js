import _ from 'lodash';

import React from 'react';
import PropTypes from 'prop-types';

const UserResults = (props) => {
  const { userData } = props;
      
  return (
    <div>
      {userData.name}
      
      <ul>
        {userData && userData.guesses.map(s => (
          <li key={s.name}>{s.name}: {s.status}</li>
        ))}
      </ul>
    </div>
  );
}

UserResults.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    guesses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
};

export default UserResults;