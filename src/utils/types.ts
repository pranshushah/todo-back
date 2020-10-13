export interface errorResponceObject {
  message: string;
  field?: string;
}

export interface errorResponse {
  errors: errorResponceObject[];
}

export interface userInfo {
  googleId?: string;
  name: string;
  email: string;
  imageURL: string;
  twitterId?: string;
  id: string;
}
