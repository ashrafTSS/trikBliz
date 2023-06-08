import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { ContactUser } from '../models/contact';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private firestore:Firestore) { }

    //add contact
    addUser(contact: ContactUser) {
      // const ref = doc(this.firestore, 'contacts', contact?.cid);
      // return from(setDoc(ref, contact));
      let $contactRef = collection(this.firestore,"contacts")
      return addDoc($contactRef,contact)
    }

}
