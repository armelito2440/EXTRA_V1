import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './extras/auth/signup/signup.component';
import { AuthComponent } from './extras/auth/auth.component';
import { RestoComponent } from './extras/resto/resto.component';
import { ExtraComponent } from './extras/extra/extra.component';
import { AddressComponent } from './extras/address/address.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TelephonComponent } from './extras/telephon/telephon.component';
import { from } from 'rxjs';
import { ProfileComponent } from './extras/profile/profile/profile.component';
import { EtablissementComponent } from './extras/profile/etablissement/etablissement.component';
import { CategoriesCorporationComponent } from './categories-corporation/categories-corporation.component';
import { GerantComponent } from './extras/gerant/gerant.component';
import { path } from 'tns-core-modules/file-system/file-system';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',

    },

    {
        path:'profile',
        component:ProfileComponent,
    },
    
    {
        path: 'home',
        component: HomeComponent,
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
        path: 'signup',
        component: SignupComponent,
    },

    {
        path: 'auth',
        component: AuthComponent,
    },

    {
        path: 'address',
        component: AddressComponent,
    },

    { 
        path: 'calendar', 
        component: CalendarComponent, data: { text: 'Calendar' } 
    },

    {   
        path: 'telephon',
        component: TelephonComponent,
    },

    {   
        path: 'etablissement',
        component: EtablissementComponent,
    },

    {   
        path: 'categories-corporation',
        component: CategoriesCorporationComponent,
    },

    {
        path: 'gerant',
        component: GerantComponent,
    },
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
