import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { UserData } from '../models/user-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firebase: AngularFireDatabase) {}



  private convertUsers(userList: SnapshotAction<UserData>[] ): UserData[] {
    return userList.map(
      item => ({
        key: item.key,
        ...item.payload.val()
      })
    );
  }

  getUsers(): Observable<UserData[]> {
    return this.firebase.list('users')
      .snapshotChanges()
      .pipe(
        map((userList: SnapshotAction<UserData>[]) => this.convertUsers(userList))
      );
  }

  getUserByEmail(email: string): Observable<UserData> {
    return this.firebase.list('users', ref => ref.orderByChild('email').equalTo(email).limitToFirst(1))
      .snapshotChanges()
      .pipe(
        map((userList: SnapshotAction<UserData>[]) => this.convertUsers(userList)[0])
      );
  }

  getUserByKey(key: string): Observable<UserData> {
    return this.firebase.list('users', ref => ref.orderByKey().equalTo(key).limitToFirst(1))
      .snapshotChanges()
      .pipe(
        map((userList: SnapshotAction<UserData>[]) => this.convertUsers(userList)[0])
      );
  }


  addUserData({ key, ...userData }: UserData) {
    const userList = this.firebase.list('users');
    if (key) {
      userList.update(key, userData);
    } else {
      userList.push(userData);
    }
  }

  removeUser(key: string) {
    console.log('remove');
    const userList = this.firebase.list('users');
    userList.remove(key);
  }

  // deleteUser(userKey) {
  //   return this.db.collection('users').doc(userKey).delete();
  // }

  // DeleteStudent(id: string) {
  //   this.studentRef = this.db.object('students-list/' + id);
  //   this.studentRef.remove();
  // }

}
