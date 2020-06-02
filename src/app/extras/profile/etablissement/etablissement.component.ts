import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl,  Validators, FormBuilder, FormControlName } from '@angular/forms';
import { RoutingService } from '@src/app/helpers/routing.service';
import { FormService } from '@src/app/helpers/form.service.tns';
import { CustomValidators } from '../../auth/custom-validators';
import { AddressService } from '@src/app/helpers/address.service';
import { AuthService } from '@src/app/extras/auth/auth.service';
import { EtablissementResponsType, EtablissementType } from '../../types';
import { EtablissementService} from '@src/app/helpers/etablissement.service';
import { from } from 'rxjs';import { CategoriesComponent } from '@src/app/shared/ui/categories/categories.component.tns';
import { CategoriesCorporationComponent } from '@src/app/categories-corporation/categories-corporation.component';
import { valueProperty } from 'tns-core-modules/ui/slider/slider';
import { DialogService } from '../../../helpers/dialog.service';
import { HttpResponse } from '@angular/common/http';
import { HttpServiceService } from '@src/app/helpers/http-service.service';
import { GerantResponsType } from '../../auth/user.model';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ValueList } from 'nativescript-drop-down';

@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.scss']
})
export class EtablissementComponent implements OnInit {
  gerant = 'any';
  corporation = '';
  @Input() userId = ''; 
  etablissement: EtablissementType;
  @Output() newEtablissement: EventEmitter<EtablissementType> = new EventEmitter();
  public _etablissement: EtablissementResponsType;
  form: FormGroup;
  isLoading = false;
  GerantList: any;
  selectedGerantIndex = '0';

  constructor(
    private http: HttpServiceService,
    private router: RoutingService,
    private formService : FormService,
    private fb : FormBuilder,
    private authService: AuthService,
    public auth: AuthService,
    private dialogService: DialogService,
    private etablissementService: EtablissementService) { }
    


  ngOnInit() {
   
  this.form = this.createEtablissementForm();
  console.log('etablissement userId: ', this.userId);
  this.auth.getGerant().subscribe(gerant_list => {
    console.log('List Gérant OK', gerant_list);
    this.GerantList = gerant_list ;
  });
  }

 

  createEtablissementForm() : FormGroup { 
    return this.fb.group(
      { 
        inputEnseigne: new FormControl(null),
        inputPhonefix: new FormControl(null, {validators: [Validators.pattern('[0-9]{10}')]}),
        inputGerant:[],
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

      // CREATION DU PATCHFORM POUR REMPLIR LE FORMULAIRE ETABLISSEMENT AVEC LES DONNEES OBTENUES PAR LE BACK

    patchForm() {
      console.log('patchform', this._etablissement);
      this.form.patchValue({
        inputEnseigne: this._etablissement,
        inputPhonefix: this._etablissement,
        inputGerant: this._etablissement,
        inputNum : this._etablissement.numero,
        inputRue: this._etablissement.rue,
        inputCP: this._etablissement.code_postal,
        inputVille: this._etablissement.ville,
        
      })
    
      
    }
    getEtablissement() {
      this.etablissementService.getEtablissement().subscribe(
        (resEtablissement: EtablissementResponsType) => {
          console.log('Etablissement component', resEtablissement);
           this._etablissement = resEtablissement;
           this.patchForm();
        },
        err => {
          console.log(err);
         
        }
      );
    }
    onSubmit() {
      console.log('enseigne: ', this.form.value.inputEnseigne);
      console.log('corporation: ', this.corporation);
      console.log('Ville: ', this.form.value.inputVille);
      console.log('phonefix: ', this.form.value.inputPhonefix);
      console.log('gerant', this.form.value.gerant_mail);
      console.log('numéro :', this.form.value.inputNum);
      console.log('Rue :', this.form.value.inputRue);
      console.log('Code Postal : ', this.form.value.inputCP);
      console.log('Ville :', this.form.value.inputVille);
     
      if (!this.form.valid) {
        console.log('le formulaire n\'est pas valide');
          return 
      }
      const adress = this.form.value.inputNum + ' ' +
      this.form.value.inputRue + ' ' +
      this.form.value.inputCP + ' ' +
      this.form.value.inputVille;

      
      // CREATION DE L'OBJET JSON DE TYPE ETABLISSEMENT
      const etablissement = {
        enseigne: this.form.value.inputEnseigne,
        ville: this.form.value.inputVille,
        corporation: this.corporation,
        phonefix: this.form.value.inputPhonefix,
        gerant: this.form.value.inputGerant,
        adresstoetablissement: { numero: this.form.value.inputNum, 
          rue: this.form.value.inputRue,
          code_postal: this.form.value.inputCP,
          ville:  this.form.value.inputVille,
          adresse: adress}
        
      }


      

      // ON ACCEDE AU SERVICE ETABLISSEMENT SERVICE
      this.etablissementService.create(etablissement);
    }
    onDone() {
      const etab = this.form.value.inputEnseigne + ' '+
                      this.form.value.inputPhonefix + ' '+
                      this.form.value.imputGerant + ' ' +
                      this.form.value.inputNum + ' ' +
                      this.form.value.inputRue + ' ' +
                      this.form.value.inputCP + ' ' +
                      this.form.value.inputVille;

      const adress = this.form.value.inputNum + ' ' +
      this.form.value.inputRue + ' ' +
      this.form.value.inputCP + ' ' +
      this.form.value.inputVille;

      this.etablissement = {
        
        enseigne: this.form.value.inputEnseigne,
        phonefix: this.form.value.inputPhonefix,
        corporation: this.corporation,
        gerant: this.form.value.inputGerant,
        adresstoetablissement: { numero: this.form.value.inputNum, 
          rue: this.form.value.inputRue,
          code_postal: this.form.value.inputCP,
          ville:  this.form.value.inputVille,
          adresse: adress
        }
    }; 

      console.log('Etablissement onDone: ', this.etablissement);
      this.newEtablissement.emit(this.etablissement);
    }

    onCorporation(event: string) {
      this.corporation = event;
    
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
    // FENETRE POUR PROPOSITION CREATION NOUVEAU GERANT

onInput(event: any){

  console.log('selected gerant', event.target.selectedIndex);
  this.gerant = this.GerantList[event.target.selectedIndex];
  this.selectedGerantIndex = event.target.selectedIndex;
  
   if (window.confirm("Souhaitez vous créer un nouveau gérant ?")) { 
        window.open ("gerant", "Nouvelle fenêtre", "gerant.html" ); return true;
        
     };
}}
    
