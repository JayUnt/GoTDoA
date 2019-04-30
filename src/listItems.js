import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ViewListIcon from '@material-ui/icons/ViewList';
import PeopleIcon from '@material-ui/icons/People';
import { SECTIONS } from './constants';

export const mainListItems = (isOpen, onClick) => {
  
  let primaryTitle = "Game of Thrones";
  let secondaryTitle = "Dead or Alive";
  if( !isOpen ){
    primaryTitle = "GoT";
    secondaryTitle = "DoA";
  }

  return (
    <div>
      <ListItem>
        <ListItemText primary={primaryTitle} secondary={secondaryTitle} />
      </ListItem>
      <ListItem button onClick={() => onClick(SECTIONS.SCORES)}>
        <ListItemIcon>
          <AssignmentIcon titleAccess="Scores" />
        </ListItemIcon>
        <ListItemText primary="Scores" />
      </ListItem>
      {/* <ListItem button onClick={() => onClick(SECTIONS.CHARTS)}>
        <ListItemIcon>
          <ViewListIcon titleAccess="Charts" />
        </ListItemIcon>
        <ListItemText primary="Charts" />
      </ListItem>     */}
      <ListItem button onClick={() => onClick(SECTIONS.MASTER)}>
        <ListItemIcon>
          <ViewListIcon titleAccess="Master" />
        </ListItemIcon>
        <ListItemText primary="Master" />
      </ListItem>    
    </div>
  );
};

export const secondaryListItems = (users, onClick) => {
  
  if( !users ){
    return null;
  }
    
  return (
    <div>
      <ListSubheader inset>Details</ListSubheader>    
      { users && users.map( u => {
        return (
          <ListItem button key={u.name} onClick={() => onClick(SECTIONS.USER_DETAIL, u.name)}>
            <ListItemIcon>
              <PeopleIcon titleAccess={u.name} />
            </ListItemIcon>
            <ListItemText primary={u.name} />
          </ListItem>
        )
      })}
    </div>
  );
};