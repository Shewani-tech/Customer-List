import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Customer, CustomerService } from '../../services/customer';

import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-cutomer-details',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cutomer-details.html',
  styleUrl: './cutomer-details.scss'
})
export class CutomerDetails implements OnInit {
  customerService = inject(CustomerService);
  activeRouter = inject(ActivatedRoute);
  customerDetails: Customer = new Customer();
  customerId: string | '' = '';
  isLoading = true;
  ngOnInit(): void {
    // window.alert('inside ngOnInit of customer details');
    this.activeRouter.params.subscribe(params => {
      this.customerId = params['id'];
      console.log('Customer ID:', this.customerId);
      if (this.customerId) {
        this.customerService.getById(this.customerId)
          .pipe(finalize(() => this.isLoading = false))
          .subscribe({
            next: (customer) => {
              this.customerDetails = customer;
              console.log('Customer Details:', this.customerDetails);
            },
            error: (err) => {
              console.error('Error fetching customer details:', err);
            }
          });
        // this.customerService.getById(this.customerId).subscribe(customer => {
        //    this.isLoading = false;
        //   this.customerDetails = customer;


        //   console.log('Customer Details:',  this.customerDetails);
        //   // Set loading to false after data is fetched
        // },error => {
        //   console.error('Error fetching customer details:', error);
        //  // this.isLoading = true; // Set loading to false in case of error
        // });
      }
    });
  }






}
