export class BinaryReaderNode {
  buffer: Buffer;
  position: number;

  constructor(binaryData: any) {
    // this.buffer = new Buffer(binaryData);
    this.buffer = Buffer.from(binaryData);
    this.position = 0;
    //console.log('Buffer: ', this.buffer);
  }

  toString() {
    return this.buffer.toString('hex');
  }

  readUInt8() {
    if (this.buffer.length < 1) {
      return 0;
    }
    const int8Value = this.buffer.readUInt8(0);
    this.buffer = this.buffer.subarray(1);
    ++this.position;
    return int8Value;
  }

  readUInt16() {
    if (this.buffer.length < 2) {
      return 0;
    }
    const int16Value = this.buffer.readUInt16LE(0);
    this.buffer = this.buffer.subarray(2);
    this.position += 2;
    return int16Value;
  }

  readUInt32() {
    if (this.buffer.length < 4) {
      return 0;
    }
    const int32Value = this.buffer.readUInt32LE(0);
    this.buffer = this.buffer.subarray(4);
    this.position += 4;
    return int32Value;
  }

  readInt8() {
    if (this.buffer.length < 1) {
      return 0;
    }
    const int8Value = this.buffer.readInt8(0);
    this.buffer = this.buffer.subarray(1);
    ++this.position;
    return int8Value;
  }

  readInt16() {
    if (this.buffer.length < 2) {
      return 0;
    }
    const int16Value = this.buffer.readInt16LE(0);
    this.buffer = this.buffer.subarray(2);
    this.position += 2;
    return int16Value;
  }

  readInt32() {
    if (this.buffer.length < 4) {
      return 0;
    }
    const int32Value = this.buffer.readInt32LE(0);
    this.buffer = this.buffer.subarray(4);
    this.position += 4;
    return int32Value;
  }

  readFloat() {
    if (this.buffer.length < 4) {
      return 0.0;
    }
    const floatValue = this.buffer.readFloatLE(0);
    this.buffer = this.buffer.subarray(4);
    this.position += 4;
    return floatValue;
  }

  readBytes(length: number) {
    if (this.buffer.length < length) {
      return Buffer.from([]);
    }
    const byteValue = Buffer.alloc(length);
    this.buffer.copy(byteValue, 0, 0, length);
    this.buffer = this.buffer.subarray(length);
    this.position += length;
    return byteValue;
    // const byteValue = this.buffer.slice(this.position, this.position + length);
    // this.buffer = this.buffer.slice(length);
    // this.position += length;
    // return byteValue;
  }

  // readString() {
  //   const length = this.buffer.readUint16LE(this.position);
  //   const bytes = this.readBytes(length);
  //   return bytes.toString();
  //   // if (!length) {
  //   //   length = this.buffer.length - this.position;
  //   // }
  //   // if (this.position + length > this.buffer.length) {
  //   //   throw new Error('Trying to read beyond the end of the binary stream.');
  //   // }
  //   // const stringValue = this.buffer.toString('binary', this.position, this.position + length);
  //   // this.position += length;
  //   // return stringValue;
  // }
}
