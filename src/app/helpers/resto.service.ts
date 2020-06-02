import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestoService {

  constructor(private restoService: RestoService) { }

  getEtablissements() {
    return this.restoService.getEtablissements();
  }
}

