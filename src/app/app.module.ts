import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import {Vibration} from '@ionic-native/vibration/ngx'
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import {Camera} from '@awesome-cordova-plugins/camera/ngx'
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [SplashScreen,WebView,Camera,Geolocation,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ScreenOrientation,NativeGeocoder,Vibration],
  bootstrap: [AppComponent],
})
export class AppModule {}
