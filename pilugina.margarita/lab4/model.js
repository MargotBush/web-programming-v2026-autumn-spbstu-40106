export class Travel {
  constructor(id, travelerName, visitedCountries = []) {
    this.id = id;
    this.travelerName = travelerName;
    this.visitedCountries = visitedCountries;
  }

  addCountry(country) {
    if (!this.visitedCountries.includes(country)) {
      this.visitedCountries.push(country);
    }
  }

  removeCountry(country) {
    this.visitedCountries = this.visitedCountries.filter(
      (item) => item !== country,
    );
  }

  get visitedCount() {
    return this.visitedCountries.length;
  }
}

export function groupByVisitedCount(travels) {
  return travels.reduce((result, travel) => {
    const count = travel.visitedCount;

    if (!result[count]) {
      result[count] = [];
    }

    result[count].push(travel);

    return result;
  }, {});
}

export function getUniqueCountries(travels) {
  return [...new Set(travels.flatMap((travel) => travel.visitedCountries))];
}

export function getTravelsByCountry(travels, country) {
  return travels.filter((travel) => travel.visitedCountries.includes(country));
}

export function groupTravelersByCountry(travels) {
  return travels.reduce((result, travel) => {
    travel.visitedCountries.forEach((country) => {
      if (!result[country]) {
        result[country] = [];
      }

      result[country].push(travel.travelerName);
    });

    return result;
  }, {});
}

export function getTravelersWithMoreThanNCountries(travels, n) {
  return travels.filter((travel) => travel.visitedCount > n);
}
