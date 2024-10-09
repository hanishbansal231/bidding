import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
      path: '',
      loadChildren: () => import('./modules/shared/module/home-routing.module').then(m => m.HomeRoutingModule)
   }
];

@NgModule({
   imports: [ RouterModule.forRoot(routes) ],
   exports: [ RouterModule ]
})
export class AppRoutingModule {}
