import { ACCCarInformation } from "../interfaces/acc-messages.interfaces";
import { logger } from "../utils/logging";

export class AccEntryListHandler {
  entryList: ACCCarInformation[];

  constructor() {
    this.entryList = [];
  }

  clearEntryList() {
    //logger.debug(`clear entry list`);
    this.entryList = [];
  }

  addEntry(entry: Partial<ACCCarInformation>) {
    //logger.debug(`add entry ${entry}`);
    this.entryList.push(entry as ACCCarInformation);
  }

  getEntryList() {
    return this.entryList;
  }
}
