import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthOutService]
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthOutService]
  },
  {
    path: 'user',
    component: UserComponent,
    // canActivate: [AuthInService]
  },
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [AuthOutService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
