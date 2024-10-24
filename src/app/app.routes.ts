import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import path from 'path';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    
    {
        path:'home',
        component:HomeComponent
    }

];
