import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ResumeComponent } from './resume/resume.component';
import { ProjectComponent } from './project/project.component';
import { ContactComponent } from './contact/contact.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectaddComponent } from './projectadd/projectadd.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'

//download pdf


@NgModule({
  declarations: [
    LayoutComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ResumeComponent,
    ProjectComponent,
    ContactComponent,
    ProjectaddComponent,
    ProfileComponent

  ],

  imports: [
    CommonModule,
    LayoutRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class LayoutModule { }
