import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { FooterComponent } from '@src/app/shared/footer/footer.component';
import { NavComponent } from '@src/app/shared/nav/nav.component';
import { ActionBarComponent } from '@src/app/shared/ui/action-bar/action-bar.component';
import { TabsComponent } from '@src/app/extras/profile/tabs/tabs.component.tns';
import { ProfileComponent } from '@src/app/extras/profile/profile/profile.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
 import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { AuthComponent } from '@src/app/extras/auth/auth.component';
import { SignupComponent } from '@src/app/extras/auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RestoComponent } from '@src/app/extras/resto/resto.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@src/app/extras/auth/auth-interceptor';
import { ExtraComponent } from '@src/app/extras/extra/extra.component';
import { DropDownModule } from 'nativescript-drop-down/angular';
import { CategoriesComponent } from '@src/app/shared/ui/categories/categories.component';

import { LoadingIndicatorComponent } from '@src/app/shared/ui/loading-indicator/loading-indicator.component';
import { TelephonComponent } from '@src/app/extras/telephon/telephon.component';
import { AccordionModule } from 'nativescript-accordion/angular';
import { MissionBarComponent } from '@src/app/shared/ui/mission-bar/mission-bar.component';

import { MissionsComponent } from '@src/app/extras/missions/missions.component';
import { MissionComponent } from '@src/app/extras/missions/mission/mission.component';
import { MissionModalComponent } from '@src/app/extras/missions/mission-modal/mission-modal.component';
import { AddressComponent } from '@src/app/extras/address/address.component';
import { EtablissementComponent } from '@src/app/extras/profile/etablissement/etablissement.component';
import { TabsEtabComponent } from '@src/app/extras/profile/tabs-etab/tabs-etab.component';
import { MapsComponent } from '@src/app/extras/profile/maps/maps.component';
import { CategoriesCorporationComponent } from '@src/app/ui/categories-corporation/categories-corporation.component';
import { GerantComponent } from '@src/app/extras/gerant/gerant.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavComponent,
    ActionBarComponent,
    TabsComponent,
    MapsComponent,
    ProfileComponent,
    AuthComponent,
    SignupComponent,
    RestoComponent,
    ExtraComponent,
    CategoriesComponent,
    LoadingIndicatorComponent,
    AddressComponent,
    TelephonComponent,
    MissionBarComponent,
    MissionsComponent,
    MissionComponent,
    MissionModalComponent,
    EtablissementComponent,
    TabsEtabComponent,
    CategoriesCorporationComponent,
    GerantComponent
    // AddressComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptUISideDrawerModule,
    NativeScriptHttpClientModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DropDownModule,
    AccordionModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},

  ],
  bootstrap: [AppComponent],
  entryComponents: [MissionModalComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
