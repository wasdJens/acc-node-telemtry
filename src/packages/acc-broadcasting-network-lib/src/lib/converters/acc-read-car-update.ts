import { ACCCarLocationEnum } from "../interfaces/acc-messages.enums";
import { ACCRealtimeCarUpdate } from "../interfaces/acc-messages.interfaces";
import { BinaryReaderNode } from "../utils/binary-reader.class";
import { readLap } from "./acc-read-lap";

export function readCarUpdate(reader: BinaryReaderNode) {
  const carUpdate: Partial<ACCRealtimeCarUpdate> = {};

  carUpdate.carIndex = reader.readUInt16();
  carUpdate.driverIndex = reader.readUInt16();
  carUpdate.driverCount = reader.readBytes(1).readUInt8(0);
  carUpdate.gear = reader.readBytes(1).readUInt8(0) - 1;
  carUpdate.worldPosX = reader.readFloat();
  carUpdate.worldPosY = reader.readFloat();
  carUpdate.yaw = reader.readFloat();
  carUpdate.carLocation = reader.readBytes(1).readUInt8(0) as ACCCarLocationEnum;
  carUpdate.kmh = reader.readUInt16();
  carUpdate.cupPosition = reader.readUInt16();
  carUpdate.trackPosition = reader.readUInt16();
  carUpdate.splinePosition = reader.readFloat();
  carUpdate.laps = reader.readUInt16();

  carUpdate.delta = reader.readUInt32();
  carUpdate.bestSessionLap = readLap(reader);
  carUpdate.lastLap = readLap(reader);
  carUpdate.currentLap = readLap(reader);
  // console.log('CAR UPDATE', carUpdate)

  return carUpdate as ACCRealtimeCarUpdate;
}
