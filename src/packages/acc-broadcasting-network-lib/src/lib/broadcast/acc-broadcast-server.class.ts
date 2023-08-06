import { Socket } from "dgram";
import { ACCInbountMessageTypes, ACCOutboundMessageTypes, BROADCASTING_PROTOCOL_VERSION } from "../interfaces/acc-messages.enums";
import { BinaryReaderNode } from "../utils/binary-reader.class";
import { BinaryWriterNode } from "../utils/binary-writer.class";

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
      console.log(`server got: message from ${rinfo.address}:${rinfo.port}`);
      const reader = new BinaryReaderNode(msg);
      const messageType = reader.readUInt8();
      console.log('Message Type: ', messageType);
      const result: any = {};

      switch (messageType) {
        case ACCInbountMessageTypes.REGISTRATION_RESULT:
          this.connectionId = reader.readInt32();
          result.success = reader.readBytes(1).readUInt8(0) > 0;
          // this.requestEntryList();
          // this.requestTrackData();
          break;
      }

      console.log(result);
    });

    this.server.on('error', (err) => {
      console.error(`server error:\n${err.stack}`);
      this.server.close();
    });

    this.server.on('listening', () => {
      const address = this.server.address();
      console.log(`server listening ${address.address}:${address.port}`);
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
  }

  handleError(error: Error | null) {
    if (error) {
      console.error(error);
    }
  }
}