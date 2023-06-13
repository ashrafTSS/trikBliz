import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';
import { ProjectComponent } from './project/project.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './layout/profile/profile.component';



const routes: Routes = [
{path:'home',component:HomeComponent},
{path:'resume',component:ResumeComponent},
{path:'project',component:ProjectComponent},
{path:'contact',component:ContactComponent},
{path:'profile',component:ProfileComponent}


  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
