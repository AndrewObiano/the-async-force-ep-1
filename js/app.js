// PERSON 4
function person4Request() {
  let object = JSON.parse(this.responseText);
  console.log(object);
  document.querySelector("#person4Name").innerHTML =
    "My name is " + object.name;

  // HOME REQUEST
  function person4RequestHome() {
    let home = JSON.parse(this.responseText);
    document.querySelector("#person4HomeWorld").innerHTML =
      "I am from " + home.name;
  }
  const person4Home = new XMLHttpRequest();
  person4Home.addEventListener("load", person4RequestHome);
  person4Home.open("GET", object.homeworld);
  person4Home.send();
  // END OF HOME REQUEST
}

const person4 = new XMLHttpRequest();
person4.addEventListener("load", person4Request);
person4.open("GET", "https://swapi.co/api/people/4/");
person4.send();

// PERSON 14
function person14Request() {
  let object = JSON.parse(this.responseText);
  document.querySelector("#person14Name").innerHTML =
    "My name is " + object.name;

  // SPECIES REQUEST
  function person14RequestSpecies() {
    let species = JSON.parse(this.responseText);
    document.querySelector("#person14Species").innerHTML =
      "My species is " + species.name;
  }
  const person14Species = new XMLHttpRequest();
  person14Species.addEventListener("load", person14RequestSpecies);
  person14Species.open("GET", object.species);
  person14Species.send();
  // END OF SPECIES REQUEST
}

const person14 = new XMLHttpRequest();
person14.addEventListener("load", person14Request);
person14.open("GET", "https://swapi.co/api/people/14/");
person14.send();

// FILM AND PLANETS
function filmRequest() {
  let object = JSON.parse(this.responseText);
  console.log(object.results);

  // cycle through list of film objects
  for (let i = 0; i < object.results.length; i++) {
    let film = document.createElement("li");
    film.className = "film";
    document.querySelector("#filmList").appendChild(film);

    let filmTitle = document.createElement("h2");
    filmTitle.innerHTML = object.results[i].title; // extract title name from each film object
    film.appendChild(filmTitle);

    let planeth3 = document.createElement("h3");
    planeth3.innerHTML = "Planets";
    film.appendChild(planeth3);

    let filmPlanets = document.createElement("ul");
    filmPlanets.className = "filmPlanets";
    film.appendChild(filmPlanets);

    let planetArr = object.results[i].planets; // array of planets for each film

    // BEGIN PLANET REQUEST
    for (let x = 0; x < planetArr.length; x++) {
      // cycle through array of planets
      const planetList = new XMLHttpRequest();
      planetList.addEventListener("load", planetRequest);
      planetList.open("get", planetArr[x]); // grab the array of planets
      planetList.send();

      function planetRequest() {
        let planetObj = JSON.parse(this.responseText);
        let planet = document.createElement("li");
        planet.className = "planet";
        planet.innerHTML = planetObj.name; // extract planet name for each element
        filmPlanets.appendChild(planet);
        console.log(planetObj);
      }
      // END OF PLANET REQUEST
    }
  }
}
const filmList = new XMLHttpRequest();
filmList.addEventListener("load", filmRequest);
filmList.open("GET", "https://swapi.co/api/films/");
filmList.send();
document.querySelector("#filmList").innerHTML = "Film List";
