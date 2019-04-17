import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { styles } from './UserList.style';
import { Typography } from '@material-ui/core';

function MasterList(props) {
  const { classes, userData, masterList } = props;
  const sortedList = userData.guesses.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
  
  const isCorrect = (guess) =>{
    const correct = masterList.find(i => i.Name === guess.name);
    return correct.Status === guess.status;
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        {userData.name}'s Details
      </Typography>

      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Character</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedList.map(n => (
              <TableRow key={n.name}>
                <TableCell component="th" scope="row">
                  {n.name}
                </TableCell>
                <TableCell
                  className={isCorrect(n) ? classes.correct : classes.incorrect}
                >
                  {n.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>    
  );
}

MasterList.propTypes = {
  classes: PropTypes.object.isRequired,
  userData: PropTypes.shape({}).isRequired,
  masterList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default withStyles(styles)(MasterList);