import { Socket } from 'dgram';
import { ACCOutboundMessageTypes } from '../interfaces/acc-messages.enums';
import { BinaryWriterNode } from '../utils/binary-writer.class';

export function requestTrackData(
  serverInstance: Socket,
  connectionId: number,
  port: number,
  address: string
) {
  const binaryWriter = new BinaryWriterNode();
  binaryWriter.writeBytes([ACCOutboundMessageTypes.REQUEST_TRACK_DATA]);
  binaryWriter.writeUInt32(connectionId);

  const binaryDataToSend = binaryWriter.getBinaryData();
  console.log('Request Track Data: ', binaryDataToSend);

  serverInstance.send(
    binaryDataToSend,
    0,
    binaryDataToSend.length,
    port,
    address,
    handleRequestTrackDataError
  );
}

export function requestEntryList(
  serverInstance: Socket,
  connectionId: number,
  port: number,
  address: string
) {
  const binaryWriter = new BinaryWriterNode();
  binaryWriter.writeBytes([ACCOutboundMessageTypes.REQUEST_ENTRY_LIST]);
  binaryWriter.writeUInt32(connectionId);

  const binaryDataToSend = binaryWriter.getBinaryData();
  console.log('Request Entry List: ', binaryDataToSend);

  serverInstance.send(
    binaryDataToSend,
    0,
    binaryDataToSend.length,
    port,
    address,
    handleRequestEntryListError
  );
}

function handleRequestTrackDataError(error: Error | null) {
  if (error) {
    console.error('Request Track Data Error: ', error);
  }
}

function handleRequestEntryListError(error: Error | null) {
  if (error) {
    console.error('Request Entry List Error: ', error);
  }
}
