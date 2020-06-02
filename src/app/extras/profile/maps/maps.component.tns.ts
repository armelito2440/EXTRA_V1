import { Component, OnInit, ViewChild, ElementRef, OnDestroy, OnChanges, HostListener } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as geolocation from 'nativescript-geolocation';
import { Accuracy } from 'tns-core-modules/ui/enums';

import { registerElement } from 'nativescript-angular/element-registry';
import * as app from 'tns-core-modules/application';


import { Mapbox, MapboxView, LatLng } from 'nativescript-mapbox';
registerElement('Mapbox', () => require('nativescript-mapbox').MapboxView);

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})

export class MapsComponent implements OnInit, OnDestroy, OnChanges {


    restos = [
        {lat: 45.151110, lng: 0.007634, title: 'Le Bontemps', subtitle: '24490 La Roche Chalais'},
        {lat: 45.171150, lng: 0.091608, title: 'L\'hacienda Logo\'', subtitle: '25 Le Canton, 24410 Saint-Aulaye-Puymangou'}
    ];

    @ViewChild('map', {static: true}) mapbox: ElementRef;

    longitude = 0.009740;
    latitude = 45.152086;

    constructor() {}

    ngOnInit() {
        console.log('ngOnInit');

    }
    ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
        console.log('ngOnChanges');
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    onNavigatedFrom() {
        console.log('onNavigatedFrom');
    }
    onNavigatedTo() {
        console.log('onNavigatedTo');
    }
    onPageLoaded() {
        console.log('onPageLoaded');
    }
    onNavigatingFrom() {
        console.log('onNavigatingFrom');
    }
    onNavigatingTo() {
        console.log('onNavigatingTo');
    }
    onUnloaded() {
        console.log('onUnloaded');
    }
    onLayoutChanged() {
        console.log('onLayoutChanged');
    }

    onMapReady(event) {
/*       const map: MapboxView = event.object.android ? event.object.android : event.object.ios;
      console.log(event.object.android ? "android" : "ios");
      console.log(event.object.ios ? "ios" : "android"); */

       this.showMap();
//      this.getCurrentLocation();
    }
    @HostListener('unloaded')
    ngOnDestroy() {
        console.log('onDestroy');
//        this.mapbox.nativeElement.onPause();
    }

    private getCurrentLocation() {
        geolocation.enableLocationRequest()
            .then(() => {
                geolocation.getCurrentLocation({
                    desiredAccuracy: Accuracy.high
                }).then((location) => {
                    this.longitude = location.longitude;
                    this.latitude = location.latitude;
                    console.log(this.longitude);
                    console.log(this.latitude);
                    this.showMap();
                });
            });
    }

    private showMap() {
        const latLngIn: LatLng = { lat: this.latitude, lng: this.longitude };
        console.log(latLngIn);
        this.mapbox.nativeElement.setCenter(latLngIn).then(() => {
            this.mapbox.nativeElement.getCenter().then((latLng: LatLng) => {
                console.log(latLng);
            });
        });
        this.addMarkers(this.latitude, this.longitude, 'chez moi', 'Home');
        this.addRestos();
    }

    private setCenter(map) {
        console.log('setCenter');
        try {
            map.setCenter({
                lat: this.latitude,
                lng: this.longitude,
                animated: true
            });
        } catch (ex) {
            console.log('setCenter', ex);
        }
    }
    private addMarkers(lat: number, lng: number, title: string, subtitle: string) {
        this.mapbox.nativeElement.addMarkers([
            {
                lat: lat,
                lng: lng,
                title: title,
                subtitle: subtitle
            }
        ]);
    }
    private addRestos() {
        this.restos.forEach( resto => {
            this.addMarkers(resto.lat, resto.lng, resto.title, resto.subtitle);
        });
    }
}
