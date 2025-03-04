export enum ACCInbountMessageTypes {
  REGISTRATION_RESULT = 1,
  REALTIME_UPDATE = 2,
  REALTIME_CAR_UPDATE = 3,
  ENTRY_LIST = 4,
  ENTRY_LIST_CAR = 6,
  TRACK_DATA = 5,
  BROADCASTING_EVENT = 7,
}

export enum ACCOutboundMessageTypes {
  REGISTER_COMMAND_APPLICATION = 1,
  UNREGISTER_COMMAND_APPLICATION = 9,
  REQUEST_ENTRY_LIST = 10,
  REQUEST_TRACK_DATA = 11,
  CHANGE_HUD_PAGE = 49,
  CHANGE_FOCUS = 50,
  INSTANT_REPLAY_REQUEST = 51,
}

export enum ACCCarLocationEnum {
  NONE = 0,
  Track = 1,
  Pitlane = 2,
  PitEntry = 3,
  PitExit = 4,
}

export enum ACCLapType {
  ERROR = 0,
  Outlap = 1,
  Regular = 2,
  Inlap = 3,
}

export const BROADCASTING_PROTOCOL_VERSION = 4;
