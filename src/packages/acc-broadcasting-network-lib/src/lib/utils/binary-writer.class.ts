export class BinaryWriterNode {
  buffer: Buffer;
  endianness: string;

  constructor() {
    this.buffer = Buffer.alloc(0);
    // TODO: Support big endian
    this.endianness = 'little';
  }

  writeUInt16(value: number) {
    const buffer = Buffer.alloc(2);
    buffer.writeUInt16LE(value, 0);
    this.writeBuffer(buffer);
  }

  writeUInt32(value: number) {
    const buffer = Buffer.alloc(4);
    buffer.writeUInt32LE(value, 0);
    this.writeBuffer(buffer);
  }

  writeBytes(bytes: number[]) {
    if (!Array.isArray(bytes)) {
      throw new Error('Invalid bytes. Bytes must be an array.');
    }
    const buffer = Buffer.from(bytes);
    this.writeBuffer(buffer);
  }

  writeBuffer(buffer: Buffer) {
    this.buffer = Buffer.concat([this.buffer, buffer]);
  }

  convertStringToUtf8(value: string) {
    return Buffer.from(value, 'utf8').toJSON().data;
  }

  getBinaryData() {
    console.log(this.buffer)
    return this.buffer;
  }
}