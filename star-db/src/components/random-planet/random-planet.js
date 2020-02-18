import React, { Component } from "react";
import "./random-planet.css";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true
  };

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 1500);
  }

  onPlanetLoadead = planet => {
    this.setState({ planet, loading: false, error: false });
  };

  onError = err => {
    this.setState({ loading: false, error: true });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 25) + 3;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoadead)
      .catch(this.onError);
  };

  render() {
    // return <Spinner/>;
    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);
    const errorMassage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !hasData ? null : <PlanetView planet={planet} />;
    return (
      <div className="random-planet jumbotron rounded">
        {errorMassage}
        {spinner}
        {content}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
