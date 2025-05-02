export interface Medicion {
    id: number;
    certId: string;
    reference: number;
    instrumentReading: number;
    correction: number;
    uncertainty: number;
    ambientTemp: number;
  }
  
  export interface Patron {
    id: number;
    certificateNumber: string;
    insType: string;
    brand: string;
    model: string;
    nameIdentify: string;
    description: string;
    unit: string;
    issueDate: string;
    measurements: Medicion[];
  }
  
  export interface PatronesResponse {
    status: string;
    message: string;
    data: Patron[];
    timestamp: string;
  }
  