import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './component/auth/auth/auth.component';
import { LayoutComponent } from './component/layout/layout/layout.component';

const routes: Routes = [
  {path:'',redirectTo:'auth/login',pathMatch:'full'},
  {path:'auth',component:AuthComponent,
  loadChildren:()=> import('./component/auth/auth/auth.module').then((a) => a.AuthModule)},

  {path:'layout',component:LayoutComponent,
  loadChildren:()=> import('./component/layout/layout.module').then((l)=>l.LayoutModule)},
  {path:'**',redirectTo:'auth/login',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
