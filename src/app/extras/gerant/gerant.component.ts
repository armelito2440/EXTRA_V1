import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { RoutingService } from '@src/app/helpers/routing.service';
import { CustomValidators } from '../auth/custom-validators';
import { UserMe } from '../auth/user.model';
import { DialogService } from '../../helpers/dialog.service';
import { FormService } from '../../helpers/form.service';




@Component({
  selector: 'app-gerant',
  templateUrl: './gerant.component.html',
  styleUrls: ['./gerant.component.scss']
})
export class GerantComponent implements OnInit {
    categorieControlIsValid = true;
    form: FormGroup;
    emailControlIsValid = true;
    last_nameControlIsValid = true;
    first_nameControlIsValid = true;
    isCreate = true;
    _cat = '';
    userId = '';
    


    isLoading = false;
   
    @ViewChild('emailEl', { static: false }) emailEl: ElementRef<any>;
    @ViewChild('first_nameEl', { static: false }) first_nameEl: ElementRef<any>;
    @ViewChild('last_nameEl', { static: false }) last_nameEl: ElementRef<any>;

  constructor(
    private router: RoutingService,
    private authService: AuthService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private formService: FormService,

  ) { }

  ngOnInit() {

    this.form = this.createGerantForm();

    this.form.get('email').statusChanges.subscribe((status) => {
      this.emailControlIsValid = status === 'VALID';
      console.log('emailControlIsValid', this.emailControlIsValid);
    });

    this.form.get('last_name').statusChanges.subscribe((status) => {
      this.last_nameControlIsValid = status === 'VALID';
      console.log('last_nameControlIsValid', this.last_nameControlIsValid);
    });

    this.form.get('first_name').statusChanges.subscribe((status) => {
      this.first_nameControlIsValid = status === 'VALID';
      console.log('first_nameContolIsValid', this.first_nameControlIsValid);
    });
    
  }

  createGerantForm(): FormGroup {
    return this.fb.group(
      {
        // email is required and must be a valid email email
        email:  new FormControl(null, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.email]
          }),
        
        last_name:  new FormControl(null, {
          validators: [Validators.required]
        }),
        first_name:  new FormControl(null, {
          validators: [Validators.required]
        })
     },
    
    );
  }

  onSubmit() {
    console.log('onSubmit Gerant');

  // CREATION DE L'OBJET JSON DE TYPE GERANT  
    const user = {
      email: this.form.get('email').value,
      last_name: this.form.get('last_name').value,
      first_name: this.form.get('first_name').value,
      
    };

    this.form.reset();
    this.emailControlIsValid = true;
    this.last_nameControlIsValid = true;
    this.first_nameControlIsValid = true;

    this.isLoading = true;
      console.log('onsubmit: valid', user);
      this.authService.createGerant(user).subscribe (
          (resData) => {
            console.log('Gerant', resData);
            this.router.replace(['/etablissement'], true);

            // ON BLOQUE LE LOGIN GERANT ( ENVOIE DE MAIL DE CONFIRMATION)
            // this.authService.login(user.email, user.password).subscribe ( (respData) => {
            //   console.log('login', respData);
            // },
            // (err) => {
            //   console.log(err);
            //   this.isLoading = false;
            // }
            // );
          },
          (err) => {
              this.dialogService.alert(err);
              console.log(err);
              this.isLoading = false;
          }
        );

    }
    patchForm(userMe: UserMe) {
      this.form.patchValue({
        first_name: userMe.first_name,
        last_name: userMe.last_name,
        email: userMe.email
      });
      
    }
    isValid() {
      console.log('isValid', this.form.valid);
      if (!(this.emailControlIsValid &&
        this.last_nameControlIsValid &&
        this.first_nameControlIsValid)) {
          console.log('onsubmit: invalid');
        }

    }
    onDone() {
      this.formService.dismiss([
      this.emailEl.nativeElement,
      ]);
       }

    onSwitch() {
      console.log('signup onSwitch');
      this.router.replace(['/auth'], false);
    }

  }






