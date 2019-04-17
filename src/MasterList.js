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
import { Typography } from '@material-ui/core';

function MasterList(props) {
  const { classes, list } = props;
  const sortedList = list.sort((a, b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Master List
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
              <TableRow key={n.Name}>
                <TableCell component="th" scope="row">
                  {n.Name}
                </TableCell>
                <TableCell>{n.Status}</TableCell>
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
  list: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
};

export default withStyles(styles)(MasterList);