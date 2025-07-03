

import { Routes } from '@angular/router';
import { CustomerList } from './components/customer-list/customer-list';
import { CustomerEdit } from './components/customer-edit/customer-edit';
import { CutomerDetails } from './components/cutomer-details/cutomer-details';
import { CustomerCreate } from './components/customer-create/customer-create';


export const routes: Routes = [  
      {
        path: "create",
        component: CustomerCreate
    },
    {
        path: "list",
        component: CustomerList
    },
    {
        path: 'edit/:id',
        component: CustomerEdit
    },
     {
        path: 'detail/:id',
        component: CutomerDetails
    },
    {
        path: "",
        redirectTo: "list",
        pathMatch: "full"
    }

  
];

