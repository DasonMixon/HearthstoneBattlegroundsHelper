import React, { Component } from 'react';
import './App.css';
import { Container, Grid, CircularProgress,
         Card, CardActionArea, CardContent, Typography,
         CardActions, Button, CardMedia } from '@material-ui/core';
import axios from 'axios';
import TokenService from './services/token-service';

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
    TokenService.getAccessToken().then(token => {
      if (!token) {
        this.setState({
          apiConnection: {
            unavailable: true,
            error: 'Unable to get access token'
          },
          isLoading: false
        });
      } else {
        console.log(token);
        axios.get(`https://us.api.blizzard.com/hearthstone/cards?locale=en_US&gameMode=battlegrounds&tier=hero&access_token=${token}`)
          .then(res => this.setState({items: res.data.cards, isLoading: false}))
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
          <Grid item md={4} lg={3} xs={12} sm={6} key={j}>
            <Card style={{padding: '10px'}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  src={i.battlegrounds.image}
                  title={i.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {i.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Some additional information
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
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