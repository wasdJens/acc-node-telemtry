import { CarInfo } from '../converters/acc-car-info';
import { readCarUpdate } from '../converters/acc-read-car-update';
import {
  ACCCarInformation,
} from '../interfaces/acc-messages.interfaces';
import { BinaryReaderNode } from '../utils/binary-reader.class';
import { firstOrDefault } from '../utils/first-or-default';
import { logger } from '../utils/logging';
import { AccEntryListHandler } from './acc-entry-list-handler.class';

const carEntries = new AccEntryListHandler();
const lastEntryListRequest = new Date();

export function handleRegistrationResult(reader: BinaryReaderNode) {
  const connectionId = reader.readUInt32();

  // const success = reader.readBytes(1).readUInt8(0) > 0;
  // if (success) {
  //   //logger.info(`server got: registration success`);
  // } else {
  //   //logger.error(`server got: registration failed`);
  //   throw new Error('Registration failed');
  // }
  return connectionId;
}

export function handleRealtimeCarUpdate(reader: BinaryReaderNode) {
  const carUpdate = readCarUpdate(reader);

  const carEntry = firstOrDefault<ACCCarInformation>(
    carEntries.getEntryList(),
    (entry: ACCCarInformation) => entry.carIndex === carUpdate.carIndex
  );

  if (carEntry === null || carEntry.drivers.length !== carUpdate.driverCount) {
    const current = new Date();
    if (current.getTime() - lastEntryListRequest.getTime() > 1000) {
      lastEntryListRequest.setTime(current.getTime());
      //logger.info(`request entry list`);
      throw new Error('Request entry list');
    }
  }

  console.log(carEntry);

  //logger.info(`server got: car update ${carUpdate}`);
}

export function handleEntryList(reader: BinaryReaderNode) {
  carEntries.clearEntryList();
  const carCount = reader.readUInt16();
  for (let i = 0; i < carCount; i++) {
    // const carIndex = reader.readUInt16();
    const carInfo = new CarInfo(reader.readUInt16());
    carEntries.addEntry(carInfo);
  }
  // console.log(carEntries);
}
