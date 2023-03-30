let nameOfPlanet = "Earth";
let numberOfInhabitants = 8009000000;
let countOfAtoms = 100000000000000000000000000000000000000000000000000n;
let hasEarthSatellite = true;
let ageOfDestruction = null;
let isAliensOnEarth;
let planetSymbol = Symbol("earth");
let earthData = {
    nameOfGalaxy: "The Milky Way",
    nameOfEarthSatellite: "Moon",
};


console.log(Number(nameOfPlanet), String(nameOfPlanet), Boolean(nameOfPlanet));  // NaN "Earth" true
console.log(Number(numberOfInhabitants), String(numberOfInhabitants), Boolean(numberOfInhabitants));  // 8009000000 "8009000000" true
console.log(Number(countOfAtoms), String(countOfAtoms), Boolean(countOfAtoms));  // 1e+50 "1000..." true
console.log(Number(hasEarthSatellite), String(hasEarthSatellite), Boolean(hasEarthSatellite));  // 1 "true" true
console.log(Number(ageOfDestruction), String(ageOfDestruction), Boolean(ageOfDestruction));  // 0 "null" false 
console.log(Number(isAliensOnEarth), String(isAliensOnEarth), Boolean(isAliensOnEarth));  // NaN "undefined" false
console.log(Number(earthData), String(earthData), Boolean(earthData));  // NaN [object Object] true

//console.log(Number(planetSymbol)); TypeError: Cannot convert a Symbol value to a number
console.log(String(planetSymbol)); // "Symbol(earth)" При неявном преобразовании в строку выдаст TypeError
console.log(Boolean(planetSymbol)); //true