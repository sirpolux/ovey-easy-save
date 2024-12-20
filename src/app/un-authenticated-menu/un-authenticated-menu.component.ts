
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StandardMenuService } from '../services/standard-menu.service';
import { AuthService } from '../services/auth-service';


@Component({
  selector: 'app-un-authenticated-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './un-authenticated-menu.component.html',
  styleUrl: './un-authenticated-menu.component.scss'
})
export class UnAuthenticatedMenuComponent {


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


