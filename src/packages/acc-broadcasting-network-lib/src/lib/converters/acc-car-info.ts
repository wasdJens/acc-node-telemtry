export class CarInfo {
  index = 0;
  modelType = null;
  teamName = null;
  raceNumber = null;
  cupCategory = null;
  currentDriverIndex = 0;
  drivers = [];
  nationality = 0;

  constructor(index: number) {
    this.index = index;
  }

  getCurrentDriver() {
    if (this.currentDriverIndex < this.drivers.length) {
      return this.drivers[this.currentDriverIndex]["LastName"];
    }
    return "Unknown";
  }
}
