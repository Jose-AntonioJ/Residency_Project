import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { CartesianPlane } from './cartesian-plane/cartesian-plane';
import { LoginAuth } from './login-auth/login-auth';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginAuth, pathMatch: 'full'
  },
  {
    path: 'aspersor',
    component: Home, canActivate: [AuthGuard]
  },
  {
    path: 'cartesian-plane',
    component: CartesianPlane
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
