import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { concatMap } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ImageUploadService } from 'src/app/service/image-upload.service';
import { UserService } from 'src/app/service/user.service';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  user$ = this.userService.currentUserProfile$

  profileForm = this.fb.group({
    uid: [''],
    displayName: [''],
    firstName: [''],
    lastName: [''],
    phone: [''],
    address: [''],
  });

  constructor(private authService:AuthenticationService,private imageService:ImageUploadService,
    private toast:HotToastService,
    private fb: NonNullableFormBuilder,
    private userService:UserService,
    private router:Router){}

    ngOnInit(): void{
      this.userService.currentUserProfile$.pipe(
        untilDestroyed(this)
      ).subscribe((user)=>{
        this.profileForm.patchValue({...user})
      })
    }

  //uploade image
  uploadFile(event:any,user:ProfileUser){
   this.imageService.uploadImage(event.target.files[0],`images/profile/${user.uid}`).pipe(
    this.toast.observe(
      {
        loading:'Image is loading',
        success:'image Upload is successful',
        error:'there is error in uploading image'
      }
    ),
    concatMap((photoURL)=> this.userService.updateUser({uid:user.uid,photoURL}))
   ).subscribe()
  }

  //upload userInfo
  saveProfile(){
    const { uid, ...data } = this.profileForm.value;

    if (!uid) {
      return;
    }

    this.userService
      .updateUser({ uid, ...data })
      .pipe(
        this.toast.observe({
          loading: 'Saving profile data...',
          success: 'Profile updated successfully',
          error: 'There was an error in updating the profile',
        })
      )
      .subscribe();
      this.router.navigate(['/layout/home'])
  }

}
