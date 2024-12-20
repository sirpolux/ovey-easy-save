import { Component } from '@angular/core';
import { UnAuthenticatedMenuComponent } from "../un-authenticated-menu/un-authenticated-menu.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UnAuthenticatedMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
