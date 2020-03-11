import React, { Component } from "react";
import Header from "../header";
import ItemDetails, { Record } from "../item-details";
import RandomPlanet from "../random-planet";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ErrorBoundary from "../error-boundary";

import "./app.css";
import ErrorIndicator from "../error-indicator";

import {
  PersonList,
  PlanetList,
  StarshipList, 
  PersonDetails,
  PlanetDetails,
  StarshipDetails
} from '../sw-components';

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  componentDidCatch() {
    console.log("componentDidCatch");
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    const {
      getPerson,
      getStarship,
      getPersonImage,
      getStarShipImage,
      getAllPeople,
      getAllPlanets
    } = this.swapiService;

    const personDetails = (
      <ItemDetails itemId={11} getData={getPerson} getImageUrl={getPersonImage}>
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    );

    const starShipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarShipImage}
      >
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>
    );

    return (
      <ErrorBoundary>
        <div className="app">
          <Header />

          <PersonDetails itemId={11}/>
          <PlanetDetails itemId={5}/>
          <StarshipDetails itemId={9}/>
          <PersonList/>   
          <StarshipList/>
          <PlanetList/>         

          <Row left={personDetails} right={starShipDetails} />
        </div>
      </ErrorBoundary>
    );
  }
}
