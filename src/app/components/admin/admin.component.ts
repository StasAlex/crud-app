import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'position', 'location', 'actions'];
  viewTable = true;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  key: string;

  constructor(private userService: UserService,
              private loginService: LoginService,
              private router: Router) {}


  ngOnInit() {
    this.userService.getUsers().subscribe(
      userArr => {
        this.listData = new MatTableDataSource(userArr);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;

      });
    }
  adminLogout(): void {
    this.loginService.logOut().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  deleteUser(key: string) {
   this.userService.removeUser(key);
  }

}
