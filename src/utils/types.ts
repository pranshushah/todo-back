export interface errorResponceObject {
  message: string;
  field?: string;
}

export interface errorResponse {
  errors: errorResponceObject[];
}
