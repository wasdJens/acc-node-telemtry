import { ACCLapType } from "../interfaces/acc-messages.enums";
import { ACCLapInfo } from "../interfaces/acc-messages.interfaces";
import { BinaryReaderNode } from "../utils/binary-reader.class";

export function readLap(reader: BinaryReaderNode) {
  const lap: Partial<ACCLapInfo> = {};

  lap.laptimeMS = reader.readInt32();
  lap.carIndex = reader.readUInt16();
  lap.driverIndex = reader.readUInt16();
  lap.splits = [];
  lap.isInvalid = reader.readBytes(1).readUInt8(0) > 0;
  lap.isValidForBest = reader.readBytes(1).readUInt8(0) > 0;

  const splitCount = reader.readBytes(1).readUInt8(0);
  for (let i = 0; i < splitCount; i++) {
    lap.splits.push(reader.readInt32());
  }

  const isOutLap = reader.readBytes(1).readUInt8(0) > 0;
  const isInLap = reader.readBytes(1).readUInt8(0) > 0;

  if (isOutLap) {
    lap.type = ACCLapType.Outlap;
  } else if (isInLap) {
    lap.type = ACCLapType.Inlap;
  } else {
    lap.type = ACCLapType.Regular;
  }

  while (lap.splits.length < 3) {
    lap.splits.push(0);
  }

  return lap as ACCLapInfo;
}
