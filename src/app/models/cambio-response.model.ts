import { ConversionData } from "./conversion-data.model";

export interface CambioResponse {
  status: string;
  message: string;
  data: ConversionData;
  timestamp: string;
}