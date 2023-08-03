import dgram from 'node:dgram';
import { BinaryWriterNode } from './binary-writer.class';
import { BinaryReaderNode } from './binary-reader.class';

enum ACCInbountMessageTypes {
  REGISTRATION_RESULT = 1,
  REALTIME_UPDATE = 2,
  REALTIME_CAR_UPDATE = 3,
  ENTRY_LIST = 4,
  ENTRY_LIST_CAR = 6,
  TRACK_DATA = 5,
  BROADCASTING_EVENT = 7
}

enum ACCOutboundMessageTypes {
  REGISTER_COMMAND_APPLICATION = 1,
  UNREGISTER_COMMAND_APPLICATION = 9,
  REQUEST_ENTRY_LIST = 10,
  REQUEST_TRACK_DATA = 11,
  CHANGE_HUD_PAGE = 49,
  CHANGE_FOCUS = 50,
  INSTANT_REPLAY_REQUEST = 51,
}

export class AccBroadcastServer {
  server: any;
  connectionId: number;
  port = 9000;
  address = '127.0.0.1';

  constructor() {
    this.server = dgram.createSocket('udp4');
  }

  connect() {
    this.server.on('error', (err) => {
      console.error(`server error:\n${err.stack}`);
      this.server.close();
    });
    
    this.server.on('message', (msg, rinfo) => {
      console.log(`server got: message from ${rinfo.address}:${rinfo.port}`);
      const reader = new BinaryReaderNode(msg);
      const messageType = reader.readInt8();
      console.log('Message Type: ', messageType);

      switch (messageType) {
        case ACCInbountMessageTypes.REGISTRATION_RESULT:
          this.connectionId = reader.readInt32();
          console.log('Connection ID: ', this.connectionId);
          this.requestEntryList();
          this.requestTrackData();
          break;
        case ACCInbountMessageTypes.REALTIME_CAR_UPDATE:
          const gear = reader.readByte() - 2;
          console.log('Gear: ', gear);
          break;
        case ACCInbountMessageTypes.ENTRY_LIST:
          const sessionType = reader.readByte();
          console.log('SessionType: ', sessionType);
          break;
      }
    });
    
    this.server.on('listening', () => {
      const address = this.server.address();
      console.log(`server listening ${address.address}:${address.port}`);
    });
    
    this.server.bind(9000);

    const binaryWriter = new BinaryWriterNode();
    binaryWriter.writeByte(ACCOutboundMessageTypes.REGISTER_COMMAND_APPLICATION);
    binaryWriter.writeByte(4);
    binaryWriter.writeString('server');
    binaryWriter.writeString('asd');
    binaryWriter.writeInt32(250);

    const binary = binaryWriter.getBinaryData();

    this.server.send(binary, 0, binary.length, this.port, this.address, this.handleError)
  }

  requestTrackData() {
    const binaryWriter = new BinaryWriterNode();
    binaryWriter.writeByte(ACCOutboundMessageTypes.REQUEST_TRACK_DATA);
    binaryWriter.writeInt32(this.connectionId);

    const binary = binaryWriter.getBinaryData();

    this.server.send(binary, 0, binary.length, this.port, this.address, this.handleError)
  }

  requestEntryList() {
    const binaryWriter = new BinaryWriterNode();
    binaryWriter.writeByte(ACCOutboundMessageTypes.REQUEST_ENTRY_LIST);
    binaryWriter.writeInt32(this.connectionId);

    const binary = binaryWriter.getBinaryData();

    this.server.send(binary, 0, binary.length, this.port, this.address, (err) => this.handleError)
  }

  handleError(err) {
    if (err) {
      console.error(err);
    }
  }
}