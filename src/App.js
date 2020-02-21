import React, { Component } from 'react';
import './App.css';
import { Container, Grid, Paper } from '@material-ui/core'

class App extends Component {

  constructor() {
    super();

    this.state = {
      items: []
    }
  }

  componentDidMount() {
    fetch('https://us.api.blizzard.com/hearthstone/cards?locale=en_US&gameMode=battlegrounds&tier=hero&access_token=ACCESS_TOKEN_HERE')
      .then(Response => Response.json())
      .then(res => this.setState({items: res.cards}));
  }

  render() {
    return (
      <Container fixed className="App">
        <Grid container spacing={5}>

          {this.state.items.map((i, j) => 
            <Grid item xs key={j}>
              <Paper style={{textAlign: 'center'}}>
                <h3>{i.name}</h3>
                <img style={{display: 'block', margin: 'auto'}} src={i.battlegrounds.image} />
              </Paper>
            </Grid>)}
        </Grid>
        <ul>
          
        </ul>
      </Container>
    );
  }

}

export default App;