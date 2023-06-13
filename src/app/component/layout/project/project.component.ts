import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/models/project.module';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit,AfterViewInit {

  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addEmployeeButton') addEmployeeButton :any

  projectFrom!: FormGroup;

  projects: Project[] = [];
  projectsToDisplay: Project[] = [];

  constructor(private router:Router,private translate:TranslateService,private fb: FormBuilder
    ,private projectService:ProjectService,private toast:HotToastService){
    this.projectFrom = fb.group({});
    this.projects = [];
    this.projectsToDisplay = this.projects;
  }



  ngOnInit(): void {
    this.projectFrom = this.fb.group({
      projectname : this.fb.control(''),
      projectinfo : this.fb.control('')
    })

    this.projectService.getProject().subscribe(res=>{
      for (let pro of res) {
        this.projects.unshift(pro);
      }
      this.projectsToDisplay = this.projects;
    });

  }



  public get ProjectName(): FormControl {
    return this.projectFrom.get('projectname') as FormControl;
  }
  public get ProjectInfo(): FormControl {
    return this.projectFrom.get('projectinfo') as FormControl;
  }

  //add project
  addProject(){
    let projects: Project = {
      projectname: this.ProjectName.value,
      projectinfo: this.ProjectInfo.value,
      profile: this.fileInput.nativeElement.files[0]?.name,
    };
    this.projectService.postProject(projects).subscribe((res) => {
      this.toast.success("Successfully added project!!")
      this.projects.unshift(res);
      this.clearForm();
    });
  }

  //clear form
  clearForm() {
    this.ProjectName.setValue('');
    this.ProjectInfo.setValue('');
    this.fileInput.nativeElement.value = '';
  }

  //
  contact(){
    this.router.navigate(['layout/contact'])
  }

  ngAfterViewInit(): void {

  }

  setForm(pro: Project) {
    this.ProjectName.setValue(pro.projectname);
    this.ProjectInfo.setValue(pro.projectinfo);
    this.fileInput.nativeElement.value = '';
  }

   //delete project
   removeProject(event :any){
    this.projects.forEach((val,index)=>{
      if(val.id === parseInt(event)){
        this.projectService.deleteProject(event).subscribe((res)=>{
          this.projects.splice(index,1)
        })
      }
    })
  }

   //edit project
   editProject(event:any){
    this.projects.forEach((val, ind) => {
      if (val.id === event) {
        this.setForm(val);
      }
    });
    this.removeProject(event);
    this.addEmployeeButton.nativeElement.click();
  }

    //search project
    searchProject(event: any) {
      let filteredProject: Project[] = [];

      if (event === '') {
        this.projectsToDisplay = this.projects;
      } else {
        filteredProject = this.projects.filter((val, index) => {
          let targetKey = val.projectname.toLowerCase();
          // let targetKey = val.projectname.toLowerCase() + '' + val.projectinfo.toLowerCase();
          let searchKey = event.toLowerCase();
          return targetKey.includes(searchKey);
        });
        this.projectsToDisplay = filteredProject;
      }
    }
}
