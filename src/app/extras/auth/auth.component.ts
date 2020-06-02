import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './auth.service';
import { FormService } from '@src/app/helpers/form.service';
import { RoutingService } from '@src/app/helpers/routing.service';
import { DialogService } from '@src/app/helpers/dialog.service';
import { UserMe } from './user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  title = ' EXTRA ';
  cheminImage: any = '../../assets/images/cuisto.png';
  form: FormGroup;
  emailControlIsValid = true;
  passwordControlIsValid = true;
  btnText = 'Se connecter';
  

  isLoading = false;
  @ViewChild('passwordEl', { static: false }) passwordEl: ElementRef<any>;
  @ViewChild('emailEl', { static: false }) emailEl: ElementRef<any>;

  constructor(
    private router: RoutingService,
    private formService: FormService,
    private authService: AuthService,
    private dlgService: DialogService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(6)]
      })
    });

    this.form.get('email').statusChanges.subscribe((status) => {
      this.emailControlIsValid = status === 'VALID';
      console.log('emailControlIsValid', this.emailControlIsValid);
    });

    this.form.get('password').statusChanges.subscribe((status) => {
      this.passwordControlIsValid = status === 'VALID';
      console.log('passwordControlIsValid', this.passwordControlIsValid);
    });

  }

  onSubmit() {
    this.formService.dismiss([
      this.emailEl.nativeElement,
      this.passwordEl.nativeElement,
    ]);

    console.log('this.form', this.form);
    if (!this.form.valid) {
      console.log('login form invalid');
      return;
    }

    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    // this.form.reset();
    this.emailControlIsValid = true;
    this.passwordControlIsValid = true;

    this.isLoading = true;

      console.log('logging in...');
      this.authService.login(email, password).subscribe(
        (resData) => {
          console.log('login', resData);
          this.authService.getMe().subscribe(
            (resMe: UserMe) => {
               this.authService.Categorie = resMe.cat.cat;
              //  console.log('categorie', resMe.cat.cat)
               switch (resMe.cat.cat) {
                case 'PROPR':
                case 'GERAN':
                  this.router.replace(['/resto'], true);
                  break;
                case 'EXTRA':
                  this.router.replace(['/extra'], true);
                  break;
                default:
                  break;
              }
            },
            err => {
              console.log(err);
              this.isLoading = false;
            }
          );
          this.isLoading = false;

        },
        (err) => {
          console.log(err);
          this.isLoading = false;
        }
      );

  }
  resetPassword() {
    console.log('resetPassword: ', this.form.get('email').value);
    if (!this.form.get('email').value) {
      this.dlgService.alert('veuillez saisir un email valide');
      return;
    }
    console.log('resetPassword');
    this.authService.resetPassword(this.form.get('email').value).subscribe(
      (resData) => {
        console.log('resetPassword', resData);
        this.isLoading = false;
        this.router.replace(['/home'], true);
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  onDone() {
    this.formService.dismiss([
      this.emailEl.nativeElement,
      this.passwordEl.nativeElement
    ]);
  }

  onSwitch(cat: string) {
    console.log('onSwitch');
    this.router.replace(['/signup/' + cat], false);
  }
}
