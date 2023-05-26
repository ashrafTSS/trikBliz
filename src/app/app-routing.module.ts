import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './component/auth/auth/auth.component';

const routes: Routes = [
  {path:'',redirectTo:'auth/login',pathMatch:'full'},
  {path:'auth',component:AuthComponent,
  loadChildren:()=> import('./component/auth/auth/auth.module').then((a) => a.AuthModule)},
  {path:'**',redirectTo:'auth/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
