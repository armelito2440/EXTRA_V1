import { Injectable } from '@angular/core';
import { EtablissementType, EtablissementResponsType} from '../extras/types';
import { HttpServiceService } from './http-service.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  constructor(private http: HttpServiceService) { }

  create(etablissement: EtablissementType) {
    console.log('etablissement', etablissement);
    this.http.createEtablissement(etablissement)
  }

  getEtablissement() {
    return this.http.getEtablissement().pipe(
      tap((resData: EtablissementResponsType) => {
        console.log('EtablissementReponse OK', resData);
      }
    ));
  }
}
