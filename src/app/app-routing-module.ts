import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { CartesianPlane } from './cartesian-plane/cartesian-plane';

const routes: Routes = [
  {
    path: '',
    component: Home
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
