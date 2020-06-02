import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { FooterComponent } from '@src/app/shared/footer/footer.component';
import { NavComponent } from '@src/app/shared/nav/nav.component';
import { ActionBarComponent } from '@src/app/shared/ui/action-bar/action-bar.component';
import { AuthComponent } from '@src/app/extras/auth/auth.component';
import { SignupComponent } from '@src/app/extras/auth/signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RestoComponent } from '@src/app/extras/resto/resto.component';
import { AuthInterceptor } from '@src/app/extras/auth/auth-interceptor';
import { ExtraComponent } from '@src/app/extras/extra/extra.component';
import { CategoriesComponent } from '@src/app/shared/ui/categories/categories.component';
import { LoadingIndicatorComponent } from '@src/app/shared/ui/loading-indicator/loading-indicator.component';
import { AddressComponent } from '@src/app/extras/address/address.component';

import { MatMenuModule, MatExpansionModule, MatButtonModule } from '@angular/material';
import { CalendarComponent } from '@src/app/calendar/calendar.component';
import { IgxCalendarModule } from 'igniteui-angular';
import { TelephonComponent } from '@src/app/extras/telephon/telephon.component';
import { MissionBarComponent } from '@src/app/shared/ui/mission-bar/mission-bar.component';
import { MissionsComponent } from '@src/app/extras/missions/missions.component';
import { MissionComponent } from '@src/app/extras/missions/mission/mission.component';
import { MissionModalComponent } from '@src/app/extras/missions/mission-modal/mission-modal.component';
import { EtablissementComponent } from '@src/app/extras/profile/etablissement/etablissement.component';
import { TabsEtabComponent } from '@src/app/extras/profile/tabs-etab/tabs-etab.component';
import { MapsComponent } from '@src/app/extras/profile/maps/maps.component';
import { ProfileComponent } from '@src/app/extras/profile/profile/profile.component';
import { CategoriesCorporationComponent } from '@src/app/categories-corporation/categories-corporation.component';
import { GerantComponent } from '@src/app/extras/gerant/gerant.component';



@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        FooterComponent,
        NavComponent,
        ActionBarComponent,
        AuthComponent,
        SignupComponent,
        RestoComponent,
        ExtraComponent,
        MapsComponent,
        CategoriesComponent,
        LoadingIndicatorComponent,
        AddressComponent,
        CalendarComponent,
        TelephonComponent,
        MissionBarComponent,
        MissionsComponent,
        MissionComponent,
        MissionModalComponent,
        EtablissementComponent,
        TabsEtabComponent,
        ProfileComponent,
        CategoriesCorporationComponent,
        GerantComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatMenuModule,
        IgxCalendarModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    onProfile() {}
}



