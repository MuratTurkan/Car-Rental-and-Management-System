import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  getRole() {
    return this.authService.getRole();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  getCurrentUserName(){
    return this.authService.getCurrentUserName();
  }
}
