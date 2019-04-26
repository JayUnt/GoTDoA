import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { styles } from './MasterList.style';
import { CHARACTER_STATUS } from './constants';
import { Typography } from '@material-ui/core';

function MasterList(props) {
  const { classes, list } = props;
  const sortedList = list.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

  const aliveList = sortedList.filter(i => i.status === CHARACTER_STATUS.ALIVE);
  const deadList = sortedList.filter(i => i.status === CHARACTER_STATUS.DEAD);
  

  const renderTable = (list) => {
    return (
      <Table className={classes.table}>
        <TableBody>
          {list.map(n => (
            <TableRow key={n.name} hover={true}>
              <TableCell component="th" scope="row">
                {n.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <Grid container spacing={24} className={classes.root}>
      <Grid item>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h3" className={classes.tableHeader}>
            Alive
          </Typography>
          {renderTable(aliveList)}
        </Paper>
      </Grid>
      <Grid item>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h3" className={classes.tableHeader}>
            Dead
          </Typography>
          {renderTable(deadList)}
        </Paper>
      </Grid>
    </Grid>
  );
}

MasterList.propTypes = {
  classes: PropTypes.object.isRequired,  
  list: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
};

export default withStyles(styles)(MasterList);