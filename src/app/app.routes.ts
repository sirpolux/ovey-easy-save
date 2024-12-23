import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TransactionComponent } from './transaction/transaction.component';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { FilteredTransactionComponent } from './filtered-transaction/filtered-transaction.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { CaptureTransactionComponent } from './capture-transaction/capture-transaction.component';
import { TransactionsGuestComponent } from './transactions-guest/transactions-guest.component';

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
    
    },

    {
        path:'filtered-transactions',
        component:FilteredTransactionComponent
    },

    {
        path:'create-account',
        component:CreateClientComponent
    },
    
    {
        path:'transactions-credit',
        component:CaptureTransactionComponent
    },
    {
        path:'transactions-guest',
        component:TransactionsGuestComponent
    }

];
