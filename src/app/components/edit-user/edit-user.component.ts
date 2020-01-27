import { AngularFireDatabaseModule } from '@angular/fire/database';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  submitted: boolean;

  formControls = this.userService.userForm.controls;

  constructor(private userService: UserService,
              private router: Router) {}

  ngOnInit() {
    this.userService.getUsers();
  }

  editUser() {
    this.submitted = true;
    this.userService.addUserData(this.userService.userForm.value);
    this.router.navigateByUrl('/user');
  }
}
