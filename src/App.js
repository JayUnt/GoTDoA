import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import Scores from './Scores';
import MasterList from './MasterList';
import { SECTIONS } from './constants';
import { styles } from './App.style';
import UserList from './UserList';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';

class App extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
      loading: true,
      open: true,
      section: SECTIONS.SCORES,
      scores: null,
      selectedUser: null,
      usersData: null,
    };
  }

  componentDidMount(){
    this.loadInitialData();
  }
  
  loadInitialData(){
    const initDataUrl = this.getSheetUrl(['Scores', 'Master']);
        
    fetch(initDataUrl).then(response => response.json()).then(data => {
      const initData = {};
      
      for (var i = 0; i < data.valueRanges.length; i++) {
    
        const initDataKey = data.valueRanges[i].range.split('!')[0]
        let initDataValues = [];
   
        let values = data.valueRanges[i].values;  
        for (let i = 1; i < values.length; i++) {
          let rowobject = {};
          for (let j = 0; j < values[i].length; j++) {
            rowobject[values[0][j]] = values[i][j];
          }
          initDataValues.push(rowobject);
        }
        
        initData[initDataKey.toLowerCase()] = initDataValues;
      }
      
      this.setState({
        ...initData
      });      
      
      this.loadUserData();
    });
  }  
  
  getSheetUrl(sheets){
    const apiKey = process.env.REACT_APP_GOOGLE_ANALYTICS_API_KEY;
    const sheetId = process.env.REACT_APP_GOOGLE_SHEET_ID;
    
    let ranges;
    if( typeof sheets === 'string'){
      ranges = `ranges=${sheets}`;
    }
    else if(Array.isArray(sheets)){
      let tempRanges = [];
      
      let sheet;
      for (var i = 0; i < sheets.length; i++) {
        sheet = sheets[i];
        
        if(typeof sheet !== 'string'){
          throw new Error('invalid sheet supplied');
        }
        
        tempRanges.push(`ranges=${sheet}`);
      }
      
      ranges = tempRanges.join('&');
    }
    
    if(!ranges){
      throw new Error('invalid sheet supplied');
    }
    
    return `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?${ranges}&majorDimension=ROWS&key=${apiKey}`;
  }
  
  loadUserData(){
    const { scores } = this.state;    
    const users = scores.map(s => s.User);
   
    const userUrl = this.getSheetUrl(users);
        
    fetch(userUrl).then(response => response.json()).then(data => {
      const usersData = [];
      
      for (var i = 0; i < data.valueRanges.length; i++) {
   
        const userData = {
          name: data.valueRanges[i].range.split('!')[0],
          guesses: [],
        };
        
        let userGuesses = data.valueRanges[i].values;  
        for (let i = 1; i < userGuesses.length; i++) {
          let rowobject = {};
          for (let j = 0; j < userGuesses[i].length; j++) {
            rowobject[userGuesses[0][j].toLowerCase()] = userGuesses[i][j];
          }
          userData.guesses.push(rowobject);
        }
        
        usersData.push(userData);   
      }
      
      this.setState({
        loading: false,
        usersData
      });
    });
   
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  onMenuClick = (section, user) =>{
    this.setState({
      section,
      selectedUser: user,
    });
  }

  renderContent(){
    const { section, master } = this.state;
    
    if( section === SECTIONS.SCORES ){
      const { scores } = this.state;
      return <Scores scores={scores} masterList={master} />;
    }
    else if( section === SECTIONS.MASTER ){
      return <MasterList list={master} />;
    }
    else{
      const { selectedUser, usersData } = this.state;
      const userData = usersData.find(u => u.name === selectedUser);
          
      return (
        <UserList userData={userData} masterList={master} />        
      );
    }
  }

  render() {
    const { classes } = this.props;
    const { loading, usersData, section, selectedUser } = this.state;

    if( loading ){
      return (      
        <div className={classes.root}>
          <CssBaseline />
          <Grid container justify="center">
            <CircularProgress className={classes.progress} />
          </Grid> 
        </div>
      );
    }

    let title;
    switch(section){
      case SECTIONS.MASTER:
        title = 'Master List';
        break;
      case SECTIONS.SCORES:
        title = 'Scores';
        break;
      case SECTIONS.USER_DETAIL:
        title = `${selectedUser}'s Details`;
        break;
      default:
        title = 'Game of Thrones - Dead or Alive';
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {title}
            </Typography>           
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems(this.onMenuClick)}</List>
          <Divider />
          <List>{secondaryListItems(usersData, this.onMenuClick)}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {this.renderContent()}
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);