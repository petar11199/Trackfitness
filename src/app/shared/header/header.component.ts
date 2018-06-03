import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() {
    let burger = document.querySelector(".burger");
    let overlay = document.querySelector(".overlay");
    let nav = document.querySelector("nav");

    burger.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.toggle("clicked");
      burger.classList.toggle("clicked");
      overlay.classList.toggle("show");
      nav.classList.toggle("show");
    });
  }

  logOut() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

}
