import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project.module';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = ' http://localhost:3000/posts'

  constructor(private http:HttpClient) { }

  //get
getProject(){
  return this.http.get<Project[]>(this.baseUrl)
}

//post
postProject(project:Project){
  return this.http.post<Project>(this.baseUrl,project)
}

//delete
deleteProject(id:string){
  return this.http.delete(this.baseUrl + '/' + id)
}


}
