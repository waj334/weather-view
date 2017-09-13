import React, { Component } from 'react';
import './App.css';
import {Segment, Container, Header, Divider, Card, Image} from 'semantic-ui-react';
import * as weather from './weather.jsx';

class App extends Component {
  render() {
    var weekly = weather.apiGetWeatherWeek();
    function forecastCard(forecast){
      return (
        <Card>
          <Card.Header>
            {weather.convertDay(forecast.day)}
          </Card.Header>
          <Card.Content>
          </Card.Content>
          <Card.Content extra>
            {`H:${forcast.high}`}
            <Divider vertical/>
            {`L:${forecast.low}`}
          </Card.Content>
        </Card>
      )
    }

    return (
      <div>
        <Segment.Group>
          <Segment basic>
          </Segment>
          <Segment>
            <Card.Group>

            </Card.Group>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

export default App;
