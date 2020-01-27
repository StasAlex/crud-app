import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList: AngularFireList<any>;
  userForm = new FormGroup({
    fullName: new FormControl(''),
    position: new FormControl(''),
    mobile: new FormControl(''),
    location: new FormControl('')
  });

  constructor(
    private firebase: AngularFireDatabase
  ) {}

  getUsers() {
    this.userList = this.firebase.list('users');
    return this.userList.snapshotChanges();
  }

  addUserData(user: any) {
    this.userList.push({
      fullName: user.fullName,
      position: user.position,
      mobile: user.mobile,
      location: user.location
    });
  }
}
