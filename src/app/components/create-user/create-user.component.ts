import { UserService } from 'src/app/services/user.service';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  createUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {}

  private initForm(): void {
    this.createUserForm = this.formBuilder.group({
      key: null,
      fullName: ['', Validators.required],
      email: ['', Validators.email],
      position: '',
      mobile: ['', [Validators.required, Validators.minLength(8)]],
      location: ''
    });
  }

  ngOnInit() {
    this.initForm();
  }
  createUser() {
    this.userService.createUser(this.createUserForm.value);
    this.router.navigateByUrl('/admin');
  }

  clearFormFields() {
    this.createUserForm.reset();
  }

}
