import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StandardMenuService } from '../services/standard-menu.service';
import { UnAuthenticatedMenuComponent } from "../un-authenticated-menu/un-authenticated-menu.component";
//import { UnAuthenticatedMenuComponent } from '../un-authenticated-menu/un-authenticated-menu.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, UnAuthenticatedMenuComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private menuService = StandardMenuService;

  constructor(private authService: AuthService, private router: Router, private standardMenuService:StandardMenuService) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Extract user and token from response
        const { user, token } = response.data;

        // Store user and token
        this.authService.storeAuthData(user, token);
        this.standardMenuService.updateActiveItems('loggedIn',true);
        this.errorMessage="";
        // Redirect to a different page after successful login
        this.router.navigate(['/transactions']);
      },
      (error) => {
        console.log(error);
        if (error.error && error.error.message === 'Invalid credentials') {
          this.errorMessage = error.error.message;
          //alert('Invalid credentials');
        } else {
          this.errorMessage = "An error occured, please try again or call suport"
          //alert('An error occurred. Please try again.');
        }
      }
    );
  }
  
}
