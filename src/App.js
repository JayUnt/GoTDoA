import React, { Component } from 'react';
import './App.css';
import UserResults from './UserResults';

class App extends Component {
	
  constructor(props){
    super(props);
    
    this.state = {
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
        const initDataValues = [];
   
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
    const apiKey = 'AIzaSyDdAo1KdA4D58W0unTPDQ3AWxCRfHHdl1w';
    const sheetId = '1Dwbp9HUACShA9cFlEw3GF14qJYbRH9F4SCjXgYsde6k';
    
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
      
      this.setState({ usersData });
    });
   
  }
  
  renderUserDetails(){
    const { selectedUser, usersData } = this.state;
    const userData = usersData.find(u => u.name === selectedUser);
        
    return (
      <div>
        <div
          onClick={() => this.setState({ selectedUser: null })}
        >
          Back to list
        </div>
        <UserResults userData={userData} />
      </div>
    );
  }
  	
  render() {
    const { selectedUser } = this.state;
    
    if( selectedUser ){
      return this.renderUserDetails();
    }
    
    const { scores } = this.state;
    return (
      <div className="App">        
        <ul>
          {scores && scores.map(s => (
            <li
              key={s.User}
              onClick={() => this.setState({ selectedUser: s.User })}
             >
              {s.User}: {s.TotalScore}
            </li>
          ))}
         </ul>
      </div>
    );
  }
}

export default App;
