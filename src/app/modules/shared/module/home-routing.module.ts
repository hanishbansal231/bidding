import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { RegisterComponent } from '../../components/register/register.component';
import { LoginComponent } from '../../components/login/login.component';
import { AuthGuard } from '../../../core/guards/auth.guard';

const routes: Routes = [
   {
      path: 'register',
      component: RegisterComponent
   },
   {
      path: 'login',
      component: LoginComponent
   },
   {
      path: '',
      component: HomeComponent,
      canActivate: [AuthGuard]
   },
   {
      path: '**', // Wildcard route for a 404 page or redirect
      redirectTo: '/login', // Redirect any other path to login
      pathMatch: 'full'
   }
];

@NgModule({
   imports: [ RouterModule.forChild(routes) ],
   exports: [ RouterModule ]
})
export class HomeRoutingModule {}
