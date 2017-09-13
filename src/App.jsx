import React, { Component } from 'react';
import './App.css';
import {Segment, Container, Header, Divider, Card, Image, Grid} from 'semantic-ui-react';
import * as weather from './weather.jsx';
import Async from 'react-promise'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: weather.apiGetWeatherWeek(),
      today: weather.apiGetWeatherToday()
    }
  }

  todayForecast(today){
    return (
      <Grid.Row columns='4'>
        <Grid.Column width='2'>
            <Header size='huge' textAlign='right'>Humidity</Header>
            <Header size='huge' textAlign='right'>Dewpoint</Header>
        </Grid.Column>

        <Grid.Column width='1'>
            <Header size='huge'>{today.hum+"%"}</Header>
            <Header size='huge'>{today.dew}</Header>
        </Grid.Column>

        <Grid.Column>
        </Grid.Column>

        <Grid.Column>
          <Header size='huge' as='h1' textAlign='center' style={{'font-size':'13em'}}>{today.temp}</Header>
          <Grid columns='2'>
            <Grid.Column>
              <Container textAlign='left'>
                <Header centered style={{'font-size':'3em'}}>
                  {`H: ${today.h}`}
                </Header>
              </Container>
            </Grid.Column>
            <Grid.Column>
              <Container textAlign='right'>
                <Header centered style={{'font-size':'3em'}}>
                  {`L: ${today.l}`}
                </Header>
              </Container>
            </Grid.Column>
          </Grid>
        </Grid.Column>

        <Grid.Column verticalAlign='middle' stretched>
          <Image size='large' src={today.ico} style={{'width':'400px'}}/>
        </Grid.Column>
      </Grid.Row>
    )
  }
  
  forecastCard(forecast) {
    return (
      <Card fluid>
        <Card.Header textAlign='center'>
          <Segment basic>
            <Header centered>
              {forecast.day}
            </Header>
          </Segment>
        </Card.Header>
        <Card.Content textAlign='center'>
          <Image fluid src={weather.apiGetWeatherIcon(forecast.ico)}/>
        </Card.Content>
        <Card.Content>
          <Container>
            {forecast.desc}
          </Container>
        </Card.Content>
        <Card.Content extra>
          <Grid columns='2'>
            <Grid.Column>
              <Container textAlign='left'>
                <Header centered>
                  {`H: ${forecast.high}`}
                </Header>
              </Container>
            </Grid.Column>
            <Grid.Column>
              <Container textAlign='right'>
                <Header centered>
                  {`L: ${forecast.low}`}
                </Header>
              </Container>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
    )
  }

  render() {
    return (
      <div>
        <Segment.Group>
          <Segment basic>
            <Header textAlign='left' size='huge'>Today</Header>
            <Grid centered>
              <Async promise={this.state.today} then={(today) => {return this.todayForecast(today)}}/>
            </Grid>
          </Segment>
          <Segment basic>
            <Header textAlign='left' size='huge'>7 Day Forecast</Header>
              <Async promise={this.state.forecast} then={(forecasts) => <Card.Group itemsPerRow='7'> {
                  forecasts.map(function(forecast, i){
                    return this.forecastCard(forecasts[i]);
                  }, this)
                }</Card.Group>} />
            
          </Segment>
        </Segment.Group>
      </div>
  )}
}

export default App;
