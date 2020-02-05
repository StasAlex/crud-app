import { UserData } from './../../models/user-data.model';
import { LoginService } from 'src/app/services/login.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { tap, pluck, map, switchMap, filter } from 'rxjs/operators';
import { User } from 'firebase';
import { combineLatest, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  submitted: boolean;
  userForm: FormGroup;
  isSelfEditSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  private initForm(): void {
    this.userForm = this.formBuilder.group({
      key: null,
      fullName: ['', Validators.required],
      email: ['', Validators.email],
      position: '',
      mobile: ['', [Validators.required, Validators.minLength(8)]],
      location: ''
    });
  }

  private loadData(): void {
    combineLatest([this.loginService.getUser(), this.activatedRoute.params])
    .pipe(
      filter(([user]: [User, Params]) => !!user),
      tap(([{ email }, { key }]: [User, Params]) => {
        if (!key) {
          this.isSelfEditSubject.next(true);
          this.userForm.patchValue({ email });
        } else {
          this.isSelfEditSubject.next(false);
        }
      }),
      switchMap(([{ email }, { key }]: [User, Params]) => key
        ? this.userService.getUserByKey(key)
        : this.userService.getUserByEmail(email)),
      filter((user: UserData) => !!user),

    )
    .subscribe((user: UserData) => this.userForm.patchValue(user));
  }

  ngOnInit() {
    this.initForm();
    this.loadData();
  }

  editUser() {
    this.submitted = true;
    this.userService.addUserData(this.userForm.value);
    this.router.navigateByUrl(this.activatedRoute.snapshot.params['key'] ? '/admin' : '/user');
  }

  clearFormFields() {
    this.userForm.reset();
  }
}
