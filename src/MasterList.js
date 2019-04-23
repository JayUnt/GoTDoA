import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { styles } from './MasterList.style';

function MasterList(props) {
  const { classes, list } = props;
  const sortedList = list.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

  return (
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
            <TableRow key={n.name} hover={true}>
              <TableCell component="th" scope="row">
                {n.name}
              </TableCell>
              <TableCell>{n.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

MasterList.propTypes = {
  classes: PropTypes.object.isRequired,  
  list: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
};

export default withStyles(styles)(MasterList);