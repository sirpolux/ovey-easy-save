// import { Component, OnInit, Output, output } from '@angular/core';
// import { Route, Router, RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { ActiveMenuRepresentation } from '../services/model/active-menu-representation';
// import { StandardMenuService } from '../services/standard-menu.service';

// @Component({
//   selector: 'app-menu',
//   standalone: true,
//   imports: [
//     RouterLink,
//     CommonModule
//   ],
//   templateUrl: './menu.component.html',
//   styleUrl: './menu.component.scss'
// })
// export class MenuComponent {

//   active_tabs:ActiveMenuRepresentation;

//   constructor(
//     private router:Router,
//     private menuAction:StandardMenuService
//   ){
//     this.active_tabs=StandardMenuService.active_tabs;
//   }


//   ngOnInit(): void {
//     // Fetch the menu button and mobile menu elements
//     const menuBtn = document.getElementById('menu-btn');
//     const mobileMenu = document.getElementById('mobile-menu');

//     if (menuBtn && mobileMenu) {
//       // Toggle menu visibility on button click
//       menuBtn.addEventListener('click', () => {
//         mobileMenu.classList.toggle('hidden');
//       });

//       // Close menu when a link is clicked
//       const menuLinks = mobileMenu.querySelectorAll('a');
//       menuLinks.forEach(link => {
//         link.addEventListener('click', () => {
//           mobileMenu.classList.add('hidden');
//         });
//       });
//     } else {
//       console.error('Menu button or mobile menu element not found!');
//     }
//   }
  
// }

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StandardMenuService } from '../services/standard-menu.service';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  active_tabs = StandardMenuService.active_tabs;

  constructor(
    private router: Router, 
    private menuService: StandardMenuService,
    private authService:AuthService
  ) {}

  logout(): void {
    this.authService.logout().subscribe(
      (response) => {
        console.log(response.message); // Logs "Logged out"
        
        // Clear local storage and reset active tabs
        this.authService.clearAuthData();
        this.menuService.updateActiveItems('loggedIn', false);
        this.menuService.updateActiveItems('login', true);

        // Navigate to the login page
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }

  ngOnInit(): void {
    // Fetch the menu button and mobile menu elements
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });

      const menuLinks = mobileMenu.querySelectorAll('a');
      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    } else {
      console.error('Menu button or mobile menu element not found!');
    }
  }
  
}

