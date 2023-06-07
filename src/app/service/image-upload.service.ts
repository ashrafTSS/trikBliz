import { Injectable } from '@angular/core';
import { Storage, getDownloadURL } from '@angular/fire/storage';
import { ref, uploadBytes } from '@firebase/storage';
import { Observable, from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private stroage:Storage) { }

  //image upload
  uploadImage(image:File,path:string):Observable<string>{
    const stroageRef = ref(this.stroage,path)
    const uploadTask = from(uploadBytes(stroageRef,image))
    return uploadTask.pipe(
      switchMap((result)=> getDownloadURL(result.ref))
    )
  }

}
