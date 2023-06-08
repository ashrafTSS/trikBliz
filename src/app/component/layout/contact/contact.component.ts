import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  //contact form
  ContactForm = this.fb.group({
    fullName: ['',Validators.required],
    emailAddress: ['',[Validators.required, Validators.email]],
    phone: ['',Validators.required],
    message: ['',Validators.required],
  });

  constructor(private translate:TranslateService,private fb: NonNullableFormBuilder,
    private contactService:ContactService,private toast:HotToastService){}

  ngOnInit(): void {

  }

  get fullName() {
    return this.ContactForm.get('fullName');
  }

  get emailAddress() {
    return this.ContactForm.get('emailAddress');
  }

  get phone() {
    return this.ContactForm.get('phone');
  }

  get message() {
    return this.ContactForm.get('message');
  }

  //save contact
  saveContact(){
      this.contactService.addUser(this.ContactForm.value)
      .then(() =>{
        this.toast.success("Successfully send your message")
        this.ContactForm.reset()
      })
      .catch(()=>{
         this.toast.error("there is a send your message")
      })
  }


}
