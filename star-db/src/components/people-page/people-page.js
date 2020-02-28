import React, { Component } from "react";
import ItemList from "../item-list";
import PersonDetails from "../item-details";
import "./people-page.css";

import ErrorButton from "../error-button";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ErrorBoundary from "../error-boundary";

export default class PeoplePage extends Component {
  state = {
    selectedPerson: 3
  };

  swapiService = new SwapiService();

  onPersonSelected = id => {
    this.setState({
      selectedPerson: id
    });
  };

  render() {
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
        renderItem={({ name, gender, birthYear }) => `${name} (${birthYear})`}
      />
    );

    const personDetails = (
      <div>
        <ErrorBoundary>
          <PersonDetails personId={this.state.selectedPerson} />
          <ErrorButton />
        </ErrorBoundary>
      </div>
    );

    return <Row left={itemList} right={personDetails} />;
  }
}
