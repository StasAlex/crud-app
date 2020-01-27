import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from 'firebase';

@Component({
  selector: 'app-in-out',
  templateUrl: './in-out.component.html',
  styleUrls: ['./in-out.component.scss']
})
export class InOutComponent implements OnInit {
  isLogin$: Observable<boolean>;
  constructor(
    private loginService: LoginService,
    private router: Router) {}

  ngOnInit(): void {
    this.isLogin$ = this.isLogin();
  }

  signOut(): void {
    this.loginService.logOut().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  isLogin(): Observable<boolean> {
    return this.loginService.getUser()
    .pipe(
      map((user: User) => !!user));
  }
}
