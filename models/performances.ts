// models/performance.ts
export interface PerformanceTime {
  minutes: number;
  seconds: number;
  centiseconds: number;
}

export interface PerformanceData {
  time: PerformanceTime;
  poolLength: string;
  swimStyle: string;
  distance: number;
  date: string;
  location: string;
  eventType: string;
}

export interface PerformanceConfirmationParams {
  performance?: PerformanceData;
}

export type RootStackParamList = {
  index: undefined;
  PerformanceConfirmation: PerformanceConfirmationParams | undefined;
  // ... autres écrans et leurs paramètres
};