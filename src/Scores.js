import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { styles } from './Scores.style';
import { CHARACTER_STATUS } from './constants';

function Scores(props) {
  const { classes, scores, masterList } = props;
  const sortedScores = scores.sort((a, b) => parseInt(b.TotalScore) - parseInt(a.TotalScore));

  const totalLength = masterList.length;  
  const currentDeathCount = masterList.filter(i => i.status === CHARACTER_STATUS.DEAD).length;

  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Current Death Count
              </TableCell>
              <TableCell align="right">{currentDeathCount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    
      <Paper className={`${classes.root} ${classes.spacer}`}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Percent Correct</TableCell>
              <TableCell align="right">Guessed Deaths</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedScores.map(n => (
              <TableRow key={n.User} hover={true}>
                <TableCell component="th" scope="row">
                  {n.User}
                </TableCell>
                <TableCell align="right">{n.TotalScore}</TableCell>
                <TableCell align="right">{ Math.round( (n.TotalScore / totalLength) * 10000) / 100 }%</TableCell>
                <TableCell align="right">{n.GuessedDeathCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

Scores.propTypes = {
  classes: PropTypes.object.isRequired,
  scores: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  masterList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default withStyles(styles)(Scores);