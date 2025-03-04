/* eslint-disable no-case-declarations */
import { Socket } from "dgram";
import { ACCInbountMessageTypes, ACCOutboundMessageTypes, BROADCASTING_PROTOCOL_VERSION } from "../interfaces/acc-messages.enums";
import { BinaryReaderNode } from "../utils/binary-reader.class";
import { BinaryWriterNode } from "../utils/binary-writer.class";
import { logger } from "../utils/logging";
import { handleEntryList, handleRealtimeCarUpdate, handleRegistrationResult } from "./acc-message-handlers";
import { requestEntryList, requestTrackData } from "./acc-request-handlers";
// import binutils from "binutils";

export class AccBroadcastServer {
  server: Socket;
  connectionId: number | undefined;
  address: string;
  port: number;
  updateInterval: number;

  constructor(hostAddress: string, accPort: number, dgramInstance: any, accUpdateInterval?: number, udpPort?: number) {
    this.address = hostAddress;
    this.port = accPort;
    this.server = dgramInstance.createSocket('udp4');
    this.server.bind(udpPort || 6000);
    this.updateInterval = accUpdateInterval || 250;
    this.setupServerMessages();
  }

  setupServerMessages() {
    this.server.on('message', (msg, rinfo) => {
      // logger.info(`server got: message from ${rinfo.address}:${rinfo.port}`)
      // const r = new binutils.BinaryReader(msg, 'little');
      const reader = new BinaryReaderNode(msg);
      const messageType = reader.readUInt8();
      // console.log('MessageType: ', messageType);
      //logger.info(`server got: message type ${messageType}`)

      switch (messageType) {
        case ACCInbountMessageTypes.REGISTRATION_RESULT:
          try {
            this.connectionId = handleRegistrationResult(reader);
            requestEntryList(this.server, this.connectionId, this.port, this.address);
            requestTrackData(this.server, this.connectionId, this.port, this.address);
          } catch (e) {
            console.error(e);
            this.server.close();
          }
          break;
        case ACCInbountMessageTypes.ENTRY_LIST:
          this.connectionId = reader.readInt32();
          handleEntryList(reader);
          break;
        case ACCInbountMessageTypes.REALTIME_CAR_UPDATE:

          // const connectionId = reader.readUInt32();
          // this.connectionId = connectionId;

          try {
            handleRealtimeCarUpdate(reader);
          } catch (e) {
            requestEntryList(this.server, this.connectionId!, this.port, this.address);
          }
          break;
      }
    });

    this.server.on('error', (err) => {
      //logger.error(`server error:\n${err.stack}`);
      this.server.close();
    });

    this.server.on('listening', () => {
      const address = this.server.address();
      //logger.info(`server listening ${address.address}:${address.port}`);
    });
  }

  connect(accServerName: string, accServerPassword: string, accServerCommand: string) {
    const binaryWriter = new BinaryWriterNode();
    const displayName = binaryWriter.convertStringToUtf8(accServerName);
    const password = binaryWriter.convertStringToUtf8(accServerPassword);
    const command = binaryWriter.convertStringToUtf8(accServerCommand);

    binaryWriter.writeBytes(
      [ACCOutboundMessageTypes.REGISTER_COMMAND_APPLICATION]
    );
    binaryWriter.writeBytes([BROADCASTING_PROTOCOL_VERSION]);
    binaryWriter.writeUInt16(displayName.length);
    binaryWriter.writeBytes(displayName);
    binaryWriter.writeUInt16(password.length);
    binaryWriter.writeBytes(password);
    binaryWriter.writeUInt32(this.updateInterval);
    binaryWriter.writeUInt16(command.length);
    binaryWriter.writeBytes(command);

    const binaryDataToSend = binaryWriter.getBinaryData();

    this.server.send(
      binaryDataToSend,
      0,
      binaryDataToSend.length,
      this.port,
      this.address,
      this.handleError
    );
  }

  disconnect() {
    if (!this.connectionId) {
      throw new Error('Not connected to server')
    }
    const binaryWriter = new BinaryWriterNode();
    binaryWriter.writeBytes(
      [ACCOutboundMessageTypes.UNREGISTER_COMMAND_APPLICATION]
    );
    binaryWriter.writeUInt32(this.connectionId);

    const binaryDataToSend = binaryWriter.getBinaryData();

    this.server.send(
      binaryDataToSend,
      0,
      binaryDataToSend.length,
      this.port,
      this.address,
      this.handleError
    );

    this.server.close();
  }

  handleError(error: Error | null) {
    if (error) {
      //logger.error(`server error:\n${error.stack} \n ${error}`);
    }
  }
}
