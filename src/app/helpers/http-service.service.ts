import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenResponseData, TokenRefreshResponseData } from '../extras/return.types';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { DialogService } from './dialog.service';
import { throwError, BehaviorSubject, of } from 'rxjs';
import { UserSignUp, UserMe, GerantType, GerantResponsType } from '../extras/auth/user.model';
import { AddressType, AddressResponsType, TelephonType, TelephonResponsType, coordType } from '../extras/types';
import { EtablissementType, EtablissementResponsType} from '../extras/types';
import { ConditionalExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  private tokenAccess = '';
  private tokenRefresh: string;

  constructor(
    private http: HttpClient,
    private dialogService: DialogService) { }

  login(email: string, password: string) {
    console.log(email + ' ' + password);    //  ###TODO###
    return this.http
      .post<TokenResponseData>(
        environment.apiUrl + '/user/token/',
        { email: email, password: password }
      )
      .pipe(
        catchError(errorRes => {
          console.log('login error', errorRes);
          this.handleError(errorRes, 'login');
          return throwError(errorRes);
        }),
        tap(resData => {
          console.log('login OK', resData);
          console.log('access', resData.access);
          console.log('refresh', resData.refresh);
          this.tokenAccess = resData.access;
          this.tokenRefresh = resData.refresh;
        })
      );
  }
  createUser(user: UserSignUp) {
    console.log('http create user: ', user);
    return this.http.post(environment.apiUrl + '/user/create/',
            user).pipe(
              catchError(errorRes => {
                console.log('create error', errorRes);
                this.handleError(errorRes, 'create');
                return throwError(errorRes);
              }),
              tap(resData => {
                console.log('create OK', resData);
              })
            );
  }


//CREATION D'UN GERANT VIA LE PROPRIO - ENVOIE DE DONNEES AU BACKEND - POST
  createGerant(user: GerantType) {
    console.log('http create gerant: ', user);
    return this.http.post(environment.apiUrl + '/user/gerant/',
            user).pipe(
              catchError(errorRes => {
                console.log('create error', errorRes);
                this.handleError(errorRes, 'create');
                return throwError(errorRes);
              }),
              tap(resData => {
                console.log('create OK', resData);
              })
            );
  }

  //CREATION DE CREATE ETABLISSEMENT - ENVOIE DE DONNEES AU BACKEND - POST
  // createGerant(gerant: GerantType) {

  //   console.log('hhtp service',gerant);
  //   this.http.post(environment.apiUrl + '/user/gerant/', gerant)

  //     .subscribe(res => {
  //       console.log('geranResponse', res);
  //     },
  //     (err) => {
  //       console.log('gerant error', err);
  //     });
  // }

// CREATION DE GET GERANT - RECUPERATION DES DONNES - GET
  getGerant() {

    console.log('getGerant', environment.apiUrl + '/user/gerant');
      return this.http.get(environment.apiUrl + '/user/gerant/').pipe(

        catchError(errorRes => {
          console.log('getGerant error', errorRes);
          this.handleError(errorRes, 'getGerant');
          return throwError(errorRes);
        }),
        tap(resData => {
        console.log('getGerant OK', resData);
        })
      );
  }

   // CREATION DE GET GERANT - RECUPERATION DES DONNES - GET
  //  getGerant() {
  //   console.log('getGerant http');
  //   return this.http.get <GerantResponsType>(environment.apiUrl + '/metier/gerant_etablissement/').pipe(
  //     catchError(errorRes => {
  //       console.log('getGerant error', errorRes);
  //       this.handleError(errorRes, 'getGerant');
  //       return throwError(errorRes);
  //     }),
  //     tap(resData => {
  //       console.log('getGerant OK', resData)
  //     })
  //   )
  // }

  userCoord(coord: coordType) {
    console.log('http userCoord: ', coord);
    return this.http.post(environment.apiUrl + '/user/coord/',
    coord).pipe(
      catchError(errorRes => {
        console.log('create error', errorRes);
        this.handleError(errorRes, 'create');
        return throwError(errorRes);
      }),
      tap(resData => {
        console.log('create OK', resData);
      })
    );
  }
  patchUser(user: UserMe) {
    console.log('http: patch');
    return this.http.patch(environment.apiUrl + '/user/me/',
            user).pipe(
              catchError(errorRes => {
                console.log('patch error', errorRes);
                this.handleError(errorRes, 'patch');
                return throwError(errorRes);
              }),
              tap(resData => {
                console.log('patch OK', resData);
              })
            );
  }
  getHello() {
    console.log('getHello', environment.apiUrl + '/user/hello/');
      this.http.get(environment.apiUrl + '/user/hello').subscribe(
        (resData) => {
        console.log('getHello', resData);
      },
      (err) => {

        this.handleError(err, 'getHello');
      }
    );
  }
  getMe() {

    console.log('getMe', environment.apiUrl + '/user/me');
      return this.http.get(environment.apiUrl + '/user/me/').pipe(

        catchError(errorRes => {
          console.log('getMe error', errorRes);
          this.handleError(errorRes, 'getMe');
          return throwError(errorRes);
        }),
        tap(resData => {
//          console.log('getMe OK', resData);
        })
      );
  }
  resetPassword(email: string) {
    return this.http.post(environment.apiUrl + '/password_reset/', { email: email }).pipe(
      catchError(errorRes => {
        console.log('resetPassword error', errorRes);
        this.handleError(errorRes, 'create');
        return throwError(errorRes);
      }),
      tap(resData => {
        console.log('create OK', resData);
      })
    );
  }

  //CREATION DE CREATE ETABLISSEMENT - ENVOIE DE DONNEES AU BACKEND - POST
  createEtablissement(etablissement: EtablissementType) {

    console.log('hhtp service',etablissement);
    this.http.post(environment.apiUrl + '/metier/etablissement/', etablissement)

      .subscribe(res => {
        console.log('etablissementResponse', res);
      },
      (err) => {
        console.log('etablissement error', err);
      });
  }

  // CREATION DE GET ETABLISSEMENT - RECUPERATION DES DONNES - GET
  getEtablissement() {
    console.log('getEtablissement http');
    return this.http.get <EtablissementResponsType>(environment.apiUrl + '/metier/etablissement/').pipe(
      catchError(errorRes => {
        console.log('getEtablissement error', errorRes);
        this.handleError(errorRes, 'getEtablissement');
        return throwError(errorRes);
      }),
      tap(resData => {
        console.log('getEtablissement OK', resData)
      })
    )
  }

//CREATION DE TELEPHONUM - ENVOIE DE DONNES AU BACKEND
  createTelephone(telephon: TelephonType) {
    console.log('http service createTelephone', telephon);
    this.http.post(environment.apiUrl + '/user/coord/', telephon)
      .subscribe(res => {
        console.log('telephonResponse', res);
      },
      (err) => {
        console.log('telephon error', err);
      })
  }

// CREATION DE GET TELEPHONE - RECUPERATION DES DONNES - GET
  getTelephon() {
    console.log('getTelephone');
      return this.http.get <TelephonResponsType>(environment.apiUrl + '/user/coord/').pipe(
        catchError(errorRes => {
          console.log('getTelephon error', errorRes);
          this.handleError(errorRes, 'getTelephon');
          return throwError(errorRes);
        }),
        tap(resData => {
          console.log('getTelephon OK', resData)
        })
      )
  }
//CREATION DE CREATE ADDRESS - ENVOIE DE DONNEES AU BACKEND - POST
  createAddress(address: AddressType) {

    console.log('hhtp service',address);
    this.http.post(environment.apiUrl + '/user/coord/', address)

      .subscribe(res => {
        console.log('addressResponse', res);
      },
      (err) => {
        console.log('address error', err);
      });
  }

//CREATION DE GET ADDRESS - RECUPERATION DES DONNÉES - GET

  getAddress() {
    console.log('getAddress');
      return this.http.get <AddressResponsType>(environment.apiUrl + '/user/coord/').pipe(
        catchError(errorRes => {
          console.log('getAddress error', errorRes);
          this.handleError(errorRes, 'getAddress');
          return throwError(errorRes);
        }),
        tap(resData => {
          console.log('getAddress OK', resData);
        })
      );
  }
  refresh(route: string) {
   this.tokenAccess = '';
    this.http.post<TokenRefreshResponseData>(environment.apiUrl + '/user/token/refresh/', {refresh: this.tokenRefresh})
      .subscribe(res => {
        console.log('refresh', res);
        this.tokenAccess = res.access;
        switch (route) {
          case 'getHello':
            this.getHello();
            break;
          default:
        }
      },
      (err) => {
        console.log('refresh error', err);

      });

  }
  private handleError(error: any, route: string) {
    console.log('handleError', error.error.code);
    if ( error.error.code === 'token_not_valid') {
      console.log('token not valid', route);
      this.refresh(route);
      return;
    }
    switch (error.error.message) {
      case 'EMAIL_EXISTS':
        this.dialogService.alert('This email address exists already!');
        break;
      case 'INVALID_PASSWORD':
        this.dialogService.alert('Your password is invalid!');
        break;
      default:
        this.dialogService.alert(
          'Authentication failed, check your credentials.'
        );
    }
  }
  getToken() {
    return this.tokenAccess;
  }
  resetToken() {
    this.tokenAccess = null;
  }
  getTokenRefresh() {
    return this.tokenRefresh;
  }

}
