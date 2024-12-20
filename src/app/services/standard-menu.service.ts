// import { Injectable } from '@angular/core';
// import { ActiveMenuRepresentation } from './model/active-menu-representation';

// @Injectable({
//   providedIn: 'root'
// })
// export class StandardMenuService {

//   constructor() { }

//   static active_tabs:ActiveMenuRepresentation={
//     'login':true,
//     'dashboard':false,
//     'signUp':true,
//     'transaction':false,
//     'client':false,
//     'loggedIn':false,
//   };


//   toggleMenu(){
//     const mobileMenu = document.getElementById('mobile-menu');
//     if(mobileMenu){
//       mobileMenu.classList.toggle('hidden');
//     }
//   }


//  public updateActiveItems(name:string, value:boolean){
//       switch (name) {
//         case 'login':
//           StandardMenuService.active_tabs.login = value;
//           break;
//         case 'dashboard':
//           StandardMenuService.active_tabs.dashboard = value;
//           break;
//         case 'signUp':
//           StandardMenuService.active_tabs.signUp = value;
//           break;
//         case 'logout':
//           StandardMenuService.active_tabs.logout = value;
//           break;
//         case 'transaction':
//           StandardMenuService.active_tabs.transaction=value;
//           break;
//         case 'client':
//           StandardMenuService.active_tabs.client=value;
//           break;
//         case 'loggedIn':
//           StandardMenuService.active_tabs.loggedIn = value;
//           break;
//         default:
//           console.warn(`No active tab found with the name ${name}`);
//       }
//   }
  
//   getTabs(){
//     return StandardMenuService.active_tabs;
//   }

// }

import { Injectable } from '@angular/core';
import { ActiveMenuRepresentation } from './model/active-menu-representation';

@Injectable({
  providedIn: 'root'
})
export class StandardMenuService {
  static active_tabs: ActiveMenuRepresentation = {
    login: true,
    signUp: true,
    logout: false,
    loggedIn: false,
    transaction: false,
    client: false,
  };

  updateActiveItems(name: string, value: boolean) {
    StandardMenuService.active_tabs[name] = value;
  }

  getTabs() {
    return StandardMenuService.active_tabs;
  }
}
