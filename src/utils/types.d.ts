
export type UserDataType = { 
  email: string,
  password: string
}

export type ErrorType = {
  message: string;
  statusCode?: number;
  data?: String | any;
  details?: String | any;
}
