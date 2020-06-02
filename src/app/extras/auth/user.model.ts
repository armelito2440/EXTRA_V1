import { Identifiers } from '@angular/compiler';

export class User {
  constructor(
    public email: string,
    public last_name: string,
    public first_name: string,
    private _tokenExpirationDate: Date
  ) {}

/*   get token() {
    if (!this._token) {
      return null;
    }
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  } */

  get timeToExpiry() {
    return this._tokenExpirationDate.getTime() - new Date().getTime();
  }
}
export interface UserSignUp {
    email: string;
    password: string;
    last_name: string;
    first_name: string;
    cat: {cat: string};
}
export interface UserMe {
  email: string;
  password: string;
  last_name: string;
  first_name: string;
  cat: {
    id: Identifiers;
    cat: string};
}

export interface GerantType {
  email: string;
  last_name: string;
  first_name: string;
}

export interface GerantResponsType {
  id: string;
  email: string;
  last_name: string;
  first_name: string;
}

