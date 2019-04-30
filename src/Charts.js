import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { styles } from './Scores.style';
import { Chart } from "react-google-charts";

function Charts(props) {
  const { classes, usersData, numWeeks } = props;
  

  const data = [];

/*
  let user;
  let userData;
  for( let u = 0; u < usersData.length; u++){
    user = usersData[u];
    userData = [];

    userData.push(user.name);
    
    for( let w = 0; w < numWeeks; w++){
      userData.push(user.scores[w]);
    }

    data.push(userData);
  }
*/

//-----------
const dataPush = (index, value) =>{
  if( !data[index] )
    data[index] = [];

  data[index].push(value)
}

let i = 0;

// Setup index column
dataPush(i, 'Week');
i++;

for( let w = 0; w < numWeeks; w++){    
  dataPush(i, `Week ${w+1}`);
  i++;
}

// Setup users
let user;
for( let u = 0; u < usersData.length; u++){
  user = usersData[u];
  i = 0;

  dataPush(i, user.name);
  i++;

  for( let w = 0; w < numWeeks; w++){
    
    dataPush(i, user.scores[w]);
    i++;
  }
}


//--------


/*
  const dataPush = (index, value) =>{
    if( !data[index] )
      data[index] = [];

    data[index].push(value)
  }

  let i = 0;

  // Setup index column
  dataPush(i, 'Week');
  i++;

  for( let w = 0; w < numWeeks; w++){    
    dataPush(i, w+1);
    i++;
  }

  // Setup users
  let user;
  for( let u = 0; u < usersData.length; u++){
    user = usersData[u];
    i = 0;

    dataPush(i, user.name);
    i++;

    for( let w = 0; w < numWeeks; w++){
      
      dataPush(i, user.scores[w]);
      i++;
    }
  }
*/

  console.dir(data);
  

  return (
    <div>
      <Paper className={classes.root}>
        <Chart
          width={'800px'}
          height={'600px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={data}
          options={{
            hAxis: {
              title: 'Week',
            },
            vAxis: {
              title: 'Correct Guesses',
            },
            series: {
              1: { curveType: 'function' },
            },
          }}
          rootProps={{ 'data-testid': '2' }}
        />
      </Paper>      
    </div>
  );
}

Charts.propTypes = {
  classes: PropTypes.object.isRequired,
  usersData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  numWeeks: PropTypes.number.isRequired,
};

export default withStyles(styles)(Charts);