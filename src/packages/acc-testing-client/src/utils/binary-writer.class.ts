export class BinaryWriterNode {
  buffer: Buffer;
  constructor() {
    this.buffer = Buffer.alloc(0);
  }

  writeString(str: string) {
    const buffer = Buffer.from(str, 'binary');
    this.writeBuffer(buffer);
  }

  writeByte(byte) {
    if (typeof byte !== 'number' || byte < 0 || byte > 255) {
      throw new Error('Invalid byte value. Byte must be a number between 0 and 255.');
    }
    this.buffer = Buffer.concat([this.buffer, Buffer.from([byte])]);
  }

  writeInt32(value) {
    if (typeof value !== 'number' || !Number.isInteger(value)) {
      throw new Error('Invalid int32 value. Must be an integer.');
    }
    const buffer = Buffer.alloc(4);
    buffer.writeInt32BE(value, 0);
    this.writeBuffer(buffer);
  }

  writeBuffer(buffer) {
    this.buffer = Buffer.concat([this.buffer, buffer]);
  }

  getBinaryData() {
    return this.buffer;
  }
}