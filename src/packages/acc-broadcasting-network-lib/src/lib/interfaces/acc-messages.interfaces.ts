import { ACCCarLocationEnum, ACCLapType } from "./acc-messages.enums";

export interface ACCRealtimeCarUpdate {
  carIndex: number;
  driverIndex: number;
  gear: number;
  worldPosX: number;
  worldPosY: number;
  yaw: number;
  carLocation: ACCCarLocationEnum;
  kmh: number;
  position: number;
  trackPosition: number;
  splinePosition: number;
  delta: number;
  bestSessionLap: ACCLapInfo;
  lastLap: ACCLapInfo;
  currentLap: ACCLapInfo;
  laps: number;
  cupPosition: number;
  driverCount: number;
}

export interface ACCLapInfo {
  laptimeMS: number;
  splits: number[];
  carIndex: number;
  driverIndex: number;
  isInvalid: boolean;
  isValidForBest: boolean;
  type: ACCLapType
}

export interface ACCCarInformation {
  carIndex: number;
  carModelType: number;
  teamName: string;
  raceNumber: number;
  cupCategory: number;
  currentDriverIndex: number;
  drivers: string[];
  nationality: string;
}