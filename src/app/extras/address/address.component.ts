import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl,  Validators, FormBuilder } from '@angular/forms';
import { RoutingService } from '@src/app/helpers/routing.service';
import { FormService } from '@src/app/helpers/form.service.tns';
import { CustomValidators } from '../auth/custom-validators';
import { AddressService } from '@src/app/helpers/address.service';
import { AuthService } from '@src/app/extras/auth/auth.service';
import { AddressResponsType, AddressType, TelephonType } from '../types';



@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input() userId = ''; 
  @Input() address: AddressType = null;
  @Output() newAddress: EventEmitter<AddressType> = new EventEmitter();
  @Input() btnSubmit = false;
  private _address: AddressResponsType;
  form: FormGroup;
  telephone: TelephonType = {
    phone: '',
    phonefix: ''
  }
  // numControlIsValid = true;
  // nom_voieControlIsValid = true;
  // code_postalControlIsValid = true;
  // villeControlIsValid = true;
  // categorieControlIsValid = true;
  // enseigneControlIsValid = true;
  // villeEtabIsValid = true;
  // telEtabIsValid =  true;
  // numRueEtabIsValid = true;
  // nomRueEtabIsValid = true;
  // cpEtabIsValid = true;
  // Address = 'Address';
  // update = 'Update';
  // btntext = this.Address;
  isCreate = true;
  _cat = '';

  cheminImage: any = '../../assets/images/mrBcar.png';

  constructor(
    private router: RoutingService,
    private formService : FormService,
    private formBuilder : FormBuilder,
    private addressService : AddressService,
    public auth: AuthService) { }


  

  ngOnInit() {

    this.form = this.createAddressForm();
    console.log('address userId: ', this.userId);
/*     if (this.userId.length > 0) {
      this.getAddress();
    } */
  
  }

  createAddressForm() : FormGroup { 
    return this.formBuilder.group(
      {
        inputNum: new FormControl(null),
          
      
        inputRue: new FormControl(null, {
          validators: [Validators.required]
        }),
        inputCP: new FormControl(null, {
          validators: [Validators.required, Validators.maxLength(5),
          CustomValidators.patternValidator(/\d{5}/,{hasCP : true })
        ]}),
        inputVille: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(2)]
        })
        

      })

      }
    
      

    // CREATION DU PATCHFORM POUR REMPLIR LE FORMULAIRE ADDRESS AVEC LES DONNEES OBTENUES PAR LE BACK

    patchForm() {
      console.log('patchform', this._address);
      this.form.patchValue({
        inputNum : this._address.numero,
        inputRue: this._address.adresse,
        inputCP: this._address.code_postal,
        inputVille: this._address.ville,
        
      })
      // console.log('form', this.form.value.inputCP);
    }
    getAddress() {
      this.addressService.getAddress().subscribe(
        (resAddress: AddressResponsType) => {
          console.log('Address component', resAddress);
           this._address = resAddress;
           this.patchForm();
        },
        err => {
          console.log(err);
         
        }
      );
    }
    onSubmit() {
      console.log('numéro :', this.form.value.inputNum);
      console.log('Rue :', this.form.value.inputRue);
      console.log('Code Postal : ', this.form.value.inputCP);
      console.log('Ville :', this.form.value.inputVille);
     
      if (!this.form.valid) {
        console.log('le formulaire n\'est pas valide');
          return 
      }

      // CREATION DE L'OBJET JSON DE TYPE ADDRESS
      const address = {
        numero: this.form.value.inputNum,
        rue: this.form.value.inputRue,
        code_postal: this.form.value.inputCP,
        ville:  this.form.value.inputVille,
        adresse:'2',
      };


      

      // ON ACCEDE AU SERVICE ADDRESSSERVICE
      this.addressService.create(address);
    }
    onDone() {
      const adresse = this.form.value.inputNum + ' ' +
                      this.form.value.inputRue + ' ' +
                      this.form.value.inputCP + ' ' +
                      this.form.value.inputVille;
      this.address = {
        numero: this.form.value.inputNum,
        rue: this.form.value.inputRue,
        code_postal: this.form.value.inputCP,
        ville:  this.form.value.inputVille,
        adresse: adresse
      };      
      console.log('Address onDone: ', this.address);
      this.newAddress.emit(this.address);
    }

  }


