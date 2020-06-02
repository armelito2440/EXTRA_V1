import { Injectable } from '@angular/core';
import { AddressType, AddressResponsType, TelephonType, TelephonResponsType  } from '../extras/types';
import { HttpServiceService } from './http-service.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  
  constructor(private http: HttpServiceService) { }

  create(address: AddressType) {
    console.log('address', address);
    this.http.createAddress(address)
  }

  getAddress() {
    return this.http.getAddress().pipe(
      tap((resData: AddressResponsType) => {
        console.log('AddressReponse OK', resData);
        // this._userMe = resData;
        // this._userUpdated.next(resData);
      }

    ));

  }
  numTelephon(telephon: TelephonType) {
    console.log('telephon', telephon);
    this.http.createTelephone(telephon)

  }
  getTelephon() {
    return this.http.getTelephon().pipe(
      tap((resData: TelephonResponsType) => {
        console.log('TelephonRespons OK', resData);
      }
    ));
  }
}

