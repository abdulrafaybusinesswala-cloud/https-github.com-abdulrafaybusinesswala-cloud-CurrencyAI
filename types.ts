export interface Currency {
  code: string;
  name: string;
  flag: string;
}

export interface TrendPoint {
  date: string;
  rate: number;
}

export interface ConversionData {
  rate: number;
  convertedAmount: number;
  timestamp: string;
  explanation: string;
  trend: TrendPoint[];
}

export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  };
}

export interface ConversionState {
  loading: boolean;
  data: ConversionData | null;
  error: string | null;
  sources: GroundingSource[];
}
