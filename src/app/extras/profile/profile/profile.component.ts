import { Component, OnInit } from '@angular/core';
import { AddressResponsType, AddressType, TelephonType, coordType } from '../../types';
import { AuthService } from '../../auth/auth.service';
import { RoutingService } from '@src/app/helpers/routing.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId = '';
  signupPage = 'user';
  _cat = '';
  title = 'Extras V1';
  address: AddressType = {
    numero: '',
    rue: '',
    code_postal: '',
    ville: '',
    adresse: ''
  }
  telephone: TelephonType = {
    phone: '',
    phonefix: ''
  }
  constructor(
    private authService: AuthService,
    private router: RoutingService,

    ) {}

  ngOnInit() {
  }

  onChangeAdress(event: any) {
    console.log('onChangeAddress: ', event);
    this.address = event;
  }
  onChangePhone(event: any) {
    console.log('onChangePhone: ', event);
    this.telephone = event;
  }
  onSubmit() {
    console.log('onSubmit signup');
    console.log('Sign up address: ', this.address);
    console.log('Sign up telephone: ', this.telephone);

   const user = {
     cat: {cat: this.authService.Categorie}
   }
    
    const coord: coordType = {
     
      telephone: this.telephone,
      adresstouser: this.address
    }
    console.log('coord: ', coord);

    
    this.authService.userCoord(coord).subscribe( (coordData) => {
      
      console.log('signup coordData: ', coordData);

      if (user.cat.cat === 'EXTRA') {
        this.router.replace(['/extra'], true);
      } else {
        this.router.replace(['/resto'], true);
      }
      
    },
    (err) => {
      console.log(err);
      
    } );
  }               
  };
    
    
