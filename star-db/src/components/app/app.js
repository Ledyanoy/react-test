import React, { Component } from "react";
import Header from "../header";
import RandomPlanet from "../random-planet";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from '../../services/dummy-swapi-service';
import ErrorBoundary from "../error-boundary";

import {PeoplePage, PlanetPage, StarshipPage} from '../pages';

import "./app.css";
import ErrorIndicator from "../error-indicator";

import { SwapiServiceProvider } from '../swapi- service-context';


export default class App extends Component {  
  

  state = {    
    hasError: false,
    swapiService: new SwapiService()
  };

  onServiceChange =() => {
    this.setState(({ swapiService })=> {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      console.log('swithched to', Service);
      return {
        swapiService: new Service()
      };
    });
    
  };

  componentDidCatch() {
    console.log("componentDidCatch");
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }    

    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="app">
            <Header onServiceChange={this.onServiceChange}/>
            <RandomPlanet/>
            <PeoplePage/>
            <PlanetPage/>
            <StarshipPage/>                      
          </div>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }


}
