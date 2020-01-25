import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user$: Observable<User>;

  constructor(
    private loginService: LoginService,
    private router: Router) {

  }

  ngOnInit() {
    this.user$ = this.loginService.getUser();
  }

  logout(): void {
    this.loginService.logOut()
    .subscribe(
      () => {
        this.router.navigate(['/home']);
      });
    }
}
