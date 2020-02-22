import React, { Component } from 'react';
import './App.css';
import { Container, Grid, Paper, CircularProgress } from '@material-ui/core';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();

    this.state = {
      isLoading: true,
      apiConnection: {
        unavailable: false,
        error: null
      },
      items: []
    }
  }

  componentDidMount() {
    axios.get('https://us.api.blizzard.com/hearthstone/cards?locale=en_US&gameMode=battlegrounds&tier=hero&access_token=ACCESS_TOKEN_HERE')
      .then(res => res.json())
      .then(res => this.setState({items: res.cards, isLoading: false}))
      .catch(error => {
        console.log(error);
        
        this.setState({
          apiConnection: {
            unavailable: true,
            error: error.message
          },
          isLoading: false
        });
    });
  }

  render() {

    let value;
    if (this.state.isLoading) {
      value = <CircularProgress />;
    }
    else if (this.state.apiConnection.unavailable) {
      value = <h2>Unable to connect to the Hearthstone API server!</h2>;
    } else {
      value = <Grid container spacing={5}>
        {this.state.items.map((i, j) => 
          <Grid item xs key={j}>
            <Paper style={{textAlign: 'center'}}>
              <h3>{i.name}</h3>
              <img style={{display: 'block', margin: 'auto'}} src={i.battlegrounds.image} />
            </Paper>
          </Grid>)}
      </Grid>
    }

    return (
      <Container fixed className="App" style={{textAlign: 'center'}}>
        {value}
      </Container>
    );
  }

}

export default App;