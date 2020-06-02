import { Component, OnInit, ViewContainerRef, OnDestroy, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';

import { filter } from 'rxjs/operators';
import * as app from 'tns-core-modules/application';
import { UIService } from './shared/ui/ui.service';
import { Subscription } from 'rxjs';
import { AuthService } from './extras/auth/auth.service';
import { UserSignUp, UserMe } from './extras/auth/user.model';
import { RoutingService } from './helpers/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit  {
  @ViewChild(RadSideDrawerComponent, {static: true}) drawerComponent: RadSideDrawerComponent;
//  @ViewChild('actionBar', {static: true}) drawerComponent: RadSideDrawerComponent;

  user: UserMe;
  private _userSub: Subscription;
  private _activatedUrl: string;
  private _sideDrawerTransition: DrawerTransitionBase;
  private _drawerSub: Subscription;
  private _drawer: RadSideDrawer;


  constructor(
      private router: Router,
      private routing: RoutingService,
      private routerExtensions: RouterExtensions,
      private uiService: UIService,
      private changeDetectionRef: ChangeDetectorRef,
      private vcRef: ViewContainerRef,
      private authService: AuthService
      ) {
      // Use the component constructor to inject services.
  }

  ngOnInit(): void {
      this._activatedUrl = '/home';
      this._sideDrawerTransition = new SlideInOnTopTransition();

      this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

      console.log('ngOnInit');

      this._drawerSub = this.uiService.drawerState.subscribe(() => {
          if (this._drawer) {
            this._drawer.toggleDrawerState();
          }
        });
      this.uiService.setRootVCRef(this.vcRef);
      this._userSub = this.authService.getUserUpdateListener().subscribe(
        userData => {
          console.log('action bar', userData);
          this.user = userData;
        }
      );
  }
  ngOnDestroy() {
    if (this._drawerSub) {
      this._drawerSub.unsubscribe();
    }
    if (this._userSub) {
      this._userSub.unsubscribe();
    }  }

  ngAfterViewInit() {
    // console.log('ngAfterViewInit', this.drawerComponent);
    console.log('app ngAfterViewInit');

  this._drawer = this.drawerComponent.sideDrawer;

  this.changeDetectionRef.detectChanges();
}
  get sideDrawerTransition(): DrawerTransitionBase {
      return this._sideDrawerTransition;
  }

  isComponentSelected(url: string): boolean {
      return this._activatedUrl === url;
  }

  onNavItemTap(navItemRoute: string): void {
      this.routerExtensions.navigate([navItemRoute], {
          transition: {
              name: 'fade'
          }
      });

      const sideDrawer = <RadSideDrawer>app.getRootView();
      sideDrawer.closeDrawer();
  }
  get userEmail() {
    if (this.user) {
      if (this.user.email) {
        return this.user.email;
      }
    }
    return '####TODO####';
  }
  get userName() {
    if (this.user) {
      if (this.user.first_name && this.user.last_name) {
        return this.user.first_name + ' ' + this.user.last_name;
      }
    }
    return '####TODO####';
  }
  onUpdateUser() {
    console.log('onUpdateUser');
    this.routing.replace(['/signup/true'], false);
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.closeDrawer();
  }
}

