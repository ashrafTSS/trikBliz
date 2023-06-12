import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/models/project.module';

@Component({
  selector: 'app-projectadd',
  templateUrl: './projectadd.component.html',
  styleUrls: ['./projectadd.component.css']
})
export class ProjectaddComponent implements OnInit {


  @Input() project!:Project
  @Output() onRemoveProject = new EventEmitter<number>()
  @Output() onEditProject = new EventEmitter<number>()

constructor(){
  this.project = {
    projectname: '',
    projectinfo: '',
    profile: '',
  };
}

  ngOnInit(): void {
    console.log(this.project);
  }
  //edid
  editProject(){
    this.onEditProject.emit(this.project.id)
  }

  //delete
  deleteProject(){
    this.onRemoveProject.emit(this.project.id)
  }
}
