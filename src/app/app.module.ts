import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase/firebase.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LandingComponent } from './components/landing/landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { GamePreviewComponent } from './components/game-preview/game-preview.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GameComponent } from './components/game/game.component';
import { AuthGuard } from './auth.guard';
import { UnAuthGuard } from './un-auth.guard';
import { TypeGameComponent } from './components/games/type-game/type-game.component';
import { ClickGameComponent } from './components/games/click-game/click-game.component';    
import { SwipeGameComponent } from './components/games/swipe-game/swipe-game.component';
import { ClickGamePageComponent } from './components/games/click-game-page/click-game-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    LandingComponent,
    DashboardComponent,
    ErrorComponent,
    GamePreviewComponent,
    ProfileComponent,
    GameComponent,
    TypeGameComponent,
    ClickGameComponent,
    SwipeGameComponent,
    ClickGamePageComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [FirebaseService, AuthGuard, UnAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
