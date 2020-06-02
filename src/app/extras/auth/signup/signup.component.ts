import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormService } from '../../../helpers/form.service';
import { AuthService } from '../auth.service';
import { DialogService } from '../../../helpers/dialog.service';
import { CustomValidators } from '../custom-validators';
import { RoutingService } from '@src/app/helpers/routing.service';
import { ActivatedRoute } from '@angular/router';
import { UserMe } from '../user.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
  })

export class SignupComponent implements OnInit {
    titleCompo= 'EXTRA';
    form: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    password2ControlIsValid = true;
    last_nameControlIsValid = true;
    first_nameControlIsValid = true;
    categorieControlIsValid = true;
    signupPage = 'user';
    title = 'Sign Up';
    Signup = 'Sign up';
    update = 'coordonnées';
    btntext = this.Signup;
    isCreate = true;
    _cat = '';
    userId = '';
    

    isLoading = false;
    @ViewChild('passwordEl', { static: false }) passwordEl: ElementRef<any>;
    @ViewChild('passwordEl2', { static: false }) passwordEl2: ElementRef<any>;
    @ViewChild('emailEl', { static: false }) emailEl: ElementRef<any>;
    @ViewChild('first_nameEl', { static: false }) first_nameEl: ElementRef<any>;
    @ViewChild('last_nameEl', { static: false }) last_nameEl: ElementRef<any>;
    

    

    constructor(
      private router: RoutingService,
      private authService: AuthService,
      private formService: FormService,
      private dialogService: DialogService,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      
    ) {}

    ngOnInit() {

    

      this.form = this.createSignupForm();

      this.form.get('email').statusChanges.subscribe((status) => {
        this.emailControlIsValid = status === 'VALID';
        console.log('emailControlIsValid', this.emailControlIsValid);
      });

      this.form.get('password').statusChanges.subscribe((status) => {
        this.passwordControlIsValid = status === 'VALID';
        console.log('passwordControlIsValid', this.passwordControlIsValid);
      });

      this.form.get('password2').statusChanges.subscribe((status) => {
        this.password2ControlIsValid = status === 'VALID';
        console.log('password2ControlIsValid', this.password2ControlIsValid);
      });

      this.form.get('last_name').statusChanges.subscribe((status) => {
        this.last_nameControlIsValid = status === 'VALID';
        console.log('last_nameControlIsValid', this.last_nameControlIsValid);
      });

      this.form.get('first_name').statusChanges.subscribe((status) => {
        this.first_nameControlIsValid = status === 'VALID';
        console.log('first_nameContolIsValid', this.first_nameControlIsValid);
      });
      this.route.params.subscribe((params) => {       // pour avoir access aux paramètres passés avec the route
        console.log('route', params);
        if (params.update === 'EXTRA' || params.update === 'PROPR') {
          this._cat = params.update;
        } else {
          this.isCreate = false;
          this.title = 'Edit Profile';
          this.btntext = this.update;
          console.log('edit profile', this.authService.getUserMe());
          //this.patchForm(this.authService.getUserMe());
        }
      });
    }
    createSignupForm(): FormGroup {
      return this.fb.group(
        {
          // email is required and must be a valid email email
          email:  new FormControl(null, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.email]
            }),
          password:  new FormControl(null, {
              updateOn: 'blur',
              validators: [
             // 1. Password Field is Required
             Validators.required,
             // 2. check whether the entered password has a number
             CustomValidators.patternValidator(/\d/, { hasNumber: true }),
             // 3. check whether the entered password has upper case letter
             CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
             // 4. check whether the entered password has a lower-case letter
             CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
             // 6. Has a minimum length of 8 characters
             Validators.minLength(8)]}),
          password2: [null, Validators.compose([Validators.required])],
          last_name:  new FormControl(null, {
            validators: [Validators.required]
          }),
          first_name:  new FormControl(null, {
            validators: [Validators.required]
          })
       },
       {
          // check whether our password and confirm password match
          validator: CustomValidators.passwordMatchValidator
       });
    }
    onAddress() {
      this.signupPage = 'address';
      this.update = 's\'inscrire';
    }
   
    onSubmit() {
      console.log('onSubmit signup');
      

      const user = {
        email: this.form.get('email').value,
        password: this.form.get('password').value,
        last_name: this.form.get('last_name').value,
        first_name: this.form.get('first_name').value,
        cat: { cat: this.authService.Categorie}
      };
      
      

      this.form.reset();
      this.emailControlIsValid = true;
      this.passwordControlIsValid = true;
      this.last_nameControlIsValid = true;
      this.first_nameControlIsValid = true;

      this.isLoading = true;
      console.log('onsubmit: valid', user);
      this.authService.createUser(user).subscribe(
          (resData) => {
            console.log('Sign up', resData);
            this.authService.login(user.email, user.password).subscribe ( (respData) => {
              console.log('login', respData);
              
                if (user.cat.cat === 'EXTRA') {
                  this.router.replace(['/extra'], true);
                } else {
                  this.router.replace(['/resto'], true);
                }
                          
            },
            (err) => {
              console.log(err);
              this.isLoading = false;
            }
            );
          },
          (err) => {
              this.dialogService.alert(err);
              console.log(err);
              this.isLoading = false;
          }
        );

    }
    updateUser() {
      console.log('updateUser signup');

      // if (this.form.invalid) {
      //   return;
      // }
      // const user = {
      //   email: this.form.get('email').value,
      //   password: this.form.get('password').value,
      //   last_name: this.form.get('last_name').value,
      //   first_name: this.form.get('first_name').value,
      //   cat: { cat: this.authService.Categorie}
      // }; 

    //   console.log('updateUser: valid', user);
    //   this.authService.patchUser(user).subscribe(
    //       (resData) => {
    //         console.log('Sign up', resData);
    //       },
    //       (err) => {
    //           this.dialogService.alert(err);
    //           console.log(err);
    //           this.isLoading = false;
    //       }
    //     );

    }
    patchForm(userMe: UserMe) {
      this.form.patchValue({
        first_name: userMe.first_name,
        last_name: userMe.last_name,
        password: '********',
        email: userMe.email
      });
      this._cat = userMe.cat.cat;
    }
    isValid() {
      console.log('isValid', this.form.valid);
      if (!(this.emailControlIsValid &&
        this.passwordControlIsValid &&
        this.password2ControlIsValid &&
        this.last_nameControlIsValid &&
        this.first_nameControlIsValid &&
        this.categorieControlIsValid)) {
          console.log('onsubmit: invalid');
        }

    }
    onDone() {
      this.formService.dismiss([
        this.emailEl.nativeElement,
        this.passwordEl.nativeElement,
        this.passwordEl2.nativeElement
      ]);
       }

    onSwitch() {
      console.log('signup onSwitch');
      this.router.replace(['/auth'], false);
    }

  }

