export class BinaryReaderNode {
  buffer: Buffer;
    position: number;
  constructor(binaryData) {
    this.buffer = Buffer.from(binaryData, 'binary');
    this.position = 0;
  }

  readInt8() {
    if (this.position + 1 > this.buffer.length) {
      throw new Error('Trying to read beyond the end of the binary stream.');
    }
    const int8Value = this.buffer.readInt8(this.position);
    this.position += 1;
    return int8Value;
  }

  readInt32() {
    if (this.position + 4 > this.buffer.length) {
      throw new Error('Trying to read beyond the end of the binary stream.');
    }
    const int32Value = this.buffer.readInt32LE(this.position);
    this.position += 4;
    return int32Value;
  }

  readByte() {
    if (this.position + 1 > this.buffer.length) {
      throw new Error('Trying to read beyond the end of the binary stream.');
    }
    const byteValue = this.buffer.readUInt8(this.position);
    this.position += 1;
    return byteValue;
  }

  readString() {
    if (this.position + length > this.buffer.length) {
      throw new Error('Trying to read beyond the end of the binary stream.');
    }
    const stringValue = this.buffer.toString('binary', this.position, this.position + length);
    this.position += length;
    return stringValue;
  }
}