import { Component, OnInit, Output, output } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActiveMenuRepresentation } from '../services/model/active-menu-representation';
import { StandardMenuService } from '../services/standard-menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  active_tabs:ActiveMenuRepresentation;

  constructor(
    private router:Router,
    private menuAction:StandardMenuService
  ){
    this.active_tabs=StandardMenuService.active_tabs;
  }


  ngOnInit(): void {
    // Fetch the menu button and mobile menu elements
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
      // Toggle menu visibility on button click
      menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });

      // Close menu when a link is clicked
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

  

  // toggleMenu(){
  //   const mobileMenu = document.getElementById('mobile-menu');
  //   if(mobileMenu){
  //     mobileMenu.classList.toggle('hidden');
    
  //   }
  // }

  
}
