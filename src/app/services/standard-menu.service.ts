import { Injectable } from '@angular/core';
import { ActiveMenuRepresentation } from './model/active-menu-representation';

@Injectable({
  providedIn: 'root'
})
export class StandardMenuService {

  constructor() { }



  static active_tabs:ActiveMenuRepresentation={
    'login':true,
    'dashboard':false,
    'signUp':true
  };

  

  toggleMenu(){
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileMenu){
      mobileMenu.classList.toggle('hidden');
    
    }
  }


  updateActiveItems(name:string, value:boolean){
      switch (name) {
        case 'login':
          StandardMenuService.active_tabs.login = value;
          break;
        case 'dashboard':
          StandardMenuService.active_tabs.dashboard = value;
          break;
        case 'signUp':
          StandardMenuService.active_tabs.signUp = value;
          break;
          case 'logout':
            StandardMenuService.active_tabs.logout = value;
            break;
        default:
          console.warn(`No active tab found with the name ${name}`);
      }
  }
  
  getTabs(){
    return StandardMenuService.active_tabs;
  }

}
