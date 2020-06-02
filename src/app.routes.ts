import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import { ProfileComponent } from './extras/profile/profile/profile.component';

import { TabsComponent } from './extras/profile/tabs/tabs.component.tns';
import { MapsComponent } from './extras/profile/maps/maps.component';

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
];

