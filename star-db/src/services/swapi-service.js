eport default class SwapiService {
  _apiBase = "https://swapi.co/api/";

  async getResource(url) {
    const response = await fetch(`${this._apiBase}${url}`);
    if (!response.ok) {
      throw new Error(`fetch Error: ${url} recieved ${response.status}`);
    }
    return await response.json();
  }

  async getAllPeople() {
    const res = await this.getResource(`people/`);
    return res.results;
  }

  getPerson(id) {
    return this.getResource(`people/${id}/`);
  }

  async getAllPlanets() {
    const res = await this.getResource(`planets/`);
    return res.results;
  }

  getPlanet(id) {
    return this.getResource(`planets/${id}/`);
  }

  async getAllStarships() {
    const res = await this.getResource(`starships/`);
    return res.results;
  }

  getStarship(id) {
    return this.getResource(`starships/${id}/`);
  }
}

const swapi = new SwapiService();

swapi.getAllPeople().then(people => {
  people.forEach(p => {
    console.log("all person:", p.name);
  });
});
setTimeout(() => {
  swapi.getPerson(3).then(person => {
    console.log("person name:", person.name);
  });
}, 0);

swapi.getAllPlanets().then(planet => {
  planet.forEach(p => {
    console.log("All planets name:", p.name);
  });
});
setTimeout(() => {
  swapi.getPlanet(3).then(planet => {
    console.log("planet name:", planet.name);
  });
}, 0);

swapi.getAllStarships().then(sh => {
  sh.forEach(sh => {
    console.log("All star ships name:", sh.name);
  });
});
setTimeout(() => {
  swapi.getStarship(3).then(sh => {
    console.log("Star ships name:", sh.name);
  });
}, 0);
