import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
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

constructor(private toast:HotToastService){
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
const confirmed = confirm("Are you sure you want to remove this project?");
if (confirmed) {
  this.onRemoveProject.emit(this.project.id);
}

  }
}
