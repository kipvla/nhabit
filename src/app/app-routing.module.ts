import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { ClickGameComponent } from './components/games/click-game/click-game.component';
import { SwipeGameComponent } from './components/games/swipe-game/swipe-game.component';
import { TypeGameComponent } from './components/games/type-game/type-game.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { UnAuthGuard } from './un-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'landing', component: LandingComponent, canActivate: [UnAuthGuard], data: {animation: 'isTop'} },
  { path: 'login', component: LoginComponent, data: {animation: 'isRight'} },
  { path: 'register', component: RegisterComponent, data: {animation: 'isTop'} },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {animation: 'isLeft'} },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'game/type', component: TypeGameComponent, canActivate: [AuthGuard] },
  { path: 'game/click', component: ClickGameComponent, canActivate: [AuthGuard], data: {animation: 'isTop'} },
  { path: 'game/swipe', component: SwipeGameComponent, canActivate: [AuthGuard] },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
