import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import path from 'path';
import { TransactionComponent } from './transaction/transaction.component';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    
    {
        path:'home',
        component:HomeComponent
    }
    ,
    {
        path:'transactions',
        component:TransactionComponent
    },

    {
        path:'login',
        component:LoginComponent
    },

    {
        path:'clients',
        component:ClientComponent
    
    }


];
