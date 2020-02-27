import React, { Component } from "react";
import Header from "../header";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import RandomPlanet from "../random-planet";
import ErrorButton from "../error-button";
import PeoplePage from "../people-page";
import SwapiService from "../../services/swapi-service";

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

    return (
      <div className="app">
        <Header />

        <RandomPlanet />

        <div className="row mb2 button-row">
          <ErrorButton />
        </div>
        <PeoplePage />

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPlanets}
              renderItem={item => (
                <span>
                  {item.name}
                  <button>!</button>
                </span>
              )}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllStarships}
              renderItem={item => item.name}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>
      </div>
    );
  }
}
