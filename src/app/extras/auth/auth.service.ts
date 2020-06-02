import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';

import { User, UserMe, GerantType, GerantResponsType } from './user.model';
import { RoutingService } from '../../helpers/routing.service';
import { StorageService } from '../../helpers/storage.service';
import { UserSignUp } from './user.model';
import { HttpServiceService } from '@src/app/helpers/http-service.service';
import { tap } from 'rxjs/operators';
import { TokenResponseData } from '../return.types';
import { coordType } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);
  private _tokenExpirationTimer: any;
  private _categorie: string = 'EXTRA';
  private _userUpdated = new Subject<UserMe>();
  private _userMe: UserMe;
  private _token;


  constructor(
    private http: HttpServiceService,
    private routingService: RoutingService,
    private storageService: StorageService
    ) { }

  login(email: string, password: string) {
    console.log(email + ' ' + password);
    return this.http.login(email, password).pipe(
      tap((resData: TokenResponseData) => {
        this._token = resData.access;
      })
    );
  }
  isExtra() {
    return this.Categorie === 'EXTRA';
  }

  isPropr() {
    return this.Categorie === 'PROPR';
  }

  isGeran() {
    return this.Categorie === 'GERAN';
  }
  
  getMe() {
    return this.http.getMe().pipe(
      tap((resData: UserMe) => {
      console.log('getMe OK', resData);
        this._userMe = resData;
        this._userUpdated.next(resData);
      }
    ));
  }
  getUserUpdateListener() {
    return this._userUpdated.asObservable();
  }
  createUser(user: UserSignUp) {
    return this.http.createUser(user);
  }

  createGerant(user: GerantType) {
      return this.http.createGerant(user);
  }
 
  getGerant() {

    return this.http.getGerant();
  }

  userCoord(coord: coordType) {
    return this.http.userCoord(coord);
  }
  patchUser(user: {first_name: string, last_name: string}) {
     console.log('auth: patchUser');
     this._userMe.last_name = user.last_name;
     this._userMe.first_name = user.first_name;
     return this.http.patchUser(this._userMe);
   }
  resetPassword(email: string) {
    console.log('resetPassword (authService)');
    console.log(email);
    return this.http.resetPassword(email);
  }
  autoLogout(expiryDuration: number) {
    this._tokenExpirationTimer = setTimeout(() => this.logout(), expiryDuration);
  }
  logout() {
    this._user.next(null);
    this._token = null;
    this.storageService.remove('userData');
    if (this._tokenExpirationTimer) {
      clearTimeout(this._tokenExpirationTimer);
    }
    this.http.resetToken();
    this.routingService.replace(['/home']);
  }
  getToken() {
    return this.http.getToken();
  }
  isLoggedIn() {
//    console.log('isLoggedIn');
    const token = this.getToken();
//    console.log('token:', token);
    if (token && token.length > 0) {
 //     console.log('isLoggedIn', token.length);
      return true;
    }

  }
  getTokenRefresh() {
    return this.getTokenRefresh();
  }
  get Categorie() {
    return this._categorie;
  }
  set Categorie(categorie: string) {
    this._categorie = categorie;
  }
  get user() {
    return this._user.asObservable();
  }
  getUserMe() {
    return this._userMe;
  }
}
