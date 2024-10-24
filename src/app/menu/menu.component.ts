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

  

  toggleMenu(){
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileMenu){
      mobileMenu.classList.toggle('hidden');
    
    }
  }

  
}
