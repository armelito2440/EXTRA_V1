import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AddressService } from '@src/app/helpers/address.service';
import { FormService } from '@src/app/helpers/form.service.tns';
import { AuthService } from '@src/app/extras/auth/auth.service';
import { RoutingService } from '@src/app/helpers/routing.service';
import { TelephonResponsType, TelephonType } from '../types';



@Component({
  selector: 'app-telephon',
  templateUrl: './telephon.component.html',
  styleUrls: ['./telephon.component.scss']
})


export class TelephonComponent implements OnInit {
  @Input() userId = ''; 
  @Input() btnSubmit = false;
  @Output() newTelephone: EventEmitter<TelephonType> = new EventEmitter();
  public telephonForm: FormGroup;
  public telephon: TelephonType
  
   
  constructor(
    private router: RoutingService,
    private fb:FormBuilder,
    private addressService : AddressService,
    public auth: AuthService,) { }

  ngOnInit() {
    this.telephonForm =this.fb.group({
      phone: new FormControl (null, {validators: [Validators.required, Validators.maxLength(10)]}),
      phonefix: new FormControl (null, {validators: [Validators.pattern('[0-9]{10}')]}),
    });
    
  }

  // CREATION DU PATCHFORM POUR REMPLIR LE FORMULAIRE TELEPHONE AVEC LES DONNEES OBTENUES PAR LE BACK

  patchForm(){
    console.log('patchform', this.telephonForm);
    this.telephonForm.patchValue({
      phone: this.telephonForm,
      phonefix: this.telephonForm
    })
  }


  onSubmit(){
    console.log('numéro:', this.telephonForm.value.phone);
    console.log('format valide:', this.telephonForm.value.phone);

    console.log('numéro fixe:', this.telephonForm.value.phonefix);
    console.log('format fixe valide:', this.telephonForm.value.phonefix);

    if (!this.telephonForm.valid) {
      window.alert('le format du numéro n\'est pas valide');
        return 
    }

  // CREATION DE L'OBJET JSON DE TYPES TELEPHONE
  const telephon = {
    phone: this.telephonForm.value.phone,
    phonefix: this.telephonForm.value.phonefix
  }

  // ON ACCEDE AU SERVICE ADDRESSSERVICE
      this.addressService.numTelephon(telephon);

    }
    onDone() {
      this.telephon = {
        phone: this.telephonForm.value.phone,
        phonefix: this.telephonForm.value.phonefix
      };      
      console.log('telephone onDone: ', this.telephon);
      this.newTelephone.emit(this.telephon);
    }
}  
  
  

