import { Component, inject, OnInit, signal } from '@angular/core';
import { Customer, CustomerService } from '../../services/customer';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-customer-list',
  imports: [CommonModule,RouterModule,HttpClientModule,  MatIconModule,       // ✅ required for <mat-icon>
    MatButtonModule],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.scss',
  standalone: true
})
export class CustomerList implements OnInit {
   private customerService = inject(CustomerService);
   isloading = true;
   customerlist: Customer[] = [];
 //customerlist = signal<Customer[]>([]);
  constructor(){
    console.log('CustomerList constructor called');
    
  
   
  }
  ngOnInit(): void {
    this.customerService.get().subscribe(data => {
      this.customerlist = data;

      //   this.isloading = false;
        // this.customerlist = data;
    //  this.customerlist.set(data)
      console.log('ngOnInit list',this.customerlist);
      
      
    })
   
  }
  onDelete(customer:Customer){
    console.log(customer);
    
    if(window.confirm('Are you sure you want to delete customer' + customer.name + '?')){
      this.customerService.delete(customer._id).subscribe(
        data=>{
          console.log('customer deleted successfully');
          //  this.customerlist.set(
          //   this.customerlist().filter(customer1 => customer1._id !== customer._id)
          // );
          this.customerlist = [...this.customerlist.filter(c => c._id !== customer._id)];
        },
        error=>{
          console.error('err',error);
          
        }
      )
    }
  }

}
