export class BinaryReaderNode {
  buffer: Buffer;
    position: number;
  constructor(binaryData) {
    this.buffer = Buffer.from(binaryData, 'binary');
    this.position = 0;
    console.log('Buffer: ', this.buffer);
  }

  readUInt8() {
    if (this.position + 1 > this.buffer.length) {
      throw new Error('Trying to read beyond the end of the binary stream.');
    }
    const int8Value = this.buffer.readUInt8(this.position);
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

  readBytes(length: number) {
    if (this.position + 1 > this.buffer.length) {
      throw new Error('Trying to read beyond the end of the binary stream.');
    }
    const byteValue = this.buffer.slice(this.position, this.position + length);
    this.position += length;
    return byteValue;
  }

  readString() {
    const length = this.buffer.readUint16LE(this.position);
    const bytes = this.readBytes(length);
    return bytes.toString();
    // if (!length) {
    //   length = this.buffer.length - this.position;
    // }
    // if (this.position + length > this.buffer.length) {
    //   throw new Error('Trying to read beyond the end of the binary stream.');
    // }
    // const stringValue = this.buffer.toString('binary', this.position, this.position + length);
    // this.position += length;
    // return stringValue;
  }
}