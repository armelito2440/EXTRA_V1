import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TabsComponent } from './extras/profile/tabs/tabs.component.tns';
import { MapsComponent } from './extras/profile/maps/maps.component';
import { ProfileComponent } from './extras/profile/profile/profile.component';
import { AuthComponent } from './extras/auth/auth.component';
import { SignupComponent } from './extras/auth/signup/signup.component';
import { RestoComponent } from './extras/resto/resto.component';
import { ExtraComponent } from './extras/extra/extra.component';
import { MissionsComponent } from './extras/missions/missions.component';
import { TabsEtabComponent } from './extras/profile/tabs-etab/tabs-etab.component.tns';
import { AddressComponent } from './extras/address/address.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: HomeComponent,
  },
  {
    path: 'signup/:update',
    component: SignupComponent,
},
{
  path: 'signup',
  component: SignupComponent,
},
{
  path: 'resto',
  component: RestoComponent
},
{
  path: 'extra',
  component: ExtraComponent
},
  {
    path: 'auth',
    component: AuthComponent,
},
{
  path: 'missions',
  component: MissionsComponent
},
//  { path: 'profile', component: TabsComponent},
//  { path: 'profile', loadChildren: () => import('../app/extras/profile/profile.module').then((m) => m.ProfileModule)},
//  { path: 'profile', loadChildren: () => import('../app/extras/profile/profile.module').then((m) => m.ProfileModule)},
{ path: 'profile',
component: TabsComponent,
children: [
  { path: 'location', component: MapsComponent, outlet: 'location' },
  {
    path: 'profile',
    component: ProfileComponent,
    outlet: 'profile'
  }
]
},
{ path: 'profileEtab',
component: TabsEtabComponent,
children: [
  { path: 'location', component: MapsComponent, outlet: 'location' },
  { path: 'adresse', component: AddressComponent, outlet: 'adresse' },
  {
    path: 'profile',
    component: ProfileComponent,
    outlet: 'profile'
  }
]
},
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
