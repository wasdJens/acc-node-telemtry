import { ACCCarInformation } from "../interfaces/acc-messages.interfaces";
import { BinaryReaderNode } from "../utils/binary-reader.class";

export function readCarInformation(reader: BinaryReaderNode) {
  const car: Partial<ACCCarInformation> = {};

  car.carIndex = reader.readUInt16();

  return car as ACCCarInformation;
}