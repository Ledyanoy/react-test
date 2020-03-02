import React, { Component } from "react";
import Header from "../header";
import ItemList from "../item-list";
import ItemDetails, { Record } from "../item-details";
import RandomPlanet from "../random-planet";
import ErrorButton from "../error-button";
import PeoplePage from "../people-page";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ErrorBoundary from "../error-boundary";

import "./app.css";
import ErrorIndicator from "../error-indicator";

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
      getStarShipImage
    } = this.swapiService;

    const personDetails = (
      <ItemDetails
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}>
        <Record field='gender' label="Gender"/>
        <Record field='eyeColor' label="Eye Color"/>

      </ItemDetails>
    );

    const starShipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarShipImage}
      >
        <Record field='model' label="Model"/>
        <Record field='length' label="Length"/>
        <Record field='costInCredits' label="Cost"/>

      </ItemDetails>
    );

    return (
      <ErrorBoundary>
        <div className="app">
          <Header />
          <Row left={personDetails} right={starShipDetails} />
        </div>
      </ErrorBoundary>
    );
  }
}
