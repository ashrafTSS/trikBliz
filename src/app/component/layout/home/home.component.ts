import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router:Router,public translate:TranslateService){}

  //resume
  resume(){
    this.router.navigate(['layout/resume'])
  }

  //project
  project(){
    this.router.navigate(['layout/project'])

  }
}
