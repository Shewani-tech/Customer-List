import { Component, inject } from '@angular/core';
import { Customer, CustomerService } from '../../services/customer';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-customer-edit',
  imports: [MatFormFieldModule,MatInputModule,MatIconModule,ReactiveFormsModule,MatButtonModule,CommonModule,RouterModule],
  templateUrl: './customer-edit.html',
  styleUrl: './customer-edit.scss',
   standalone: true
})
export class CustomerEdit {
  customerService = inject(CustomerService);
    activeRouter = inject(ActivatedRoute);
    customerDetails: Customer = new Customer();
    customerId: string | '' = '';
    isLoading = true;
    customerForm! :FormGroup ;
    constructor(private fb: FormBuilder) {
      // Initialize the form group here if needed
      this.customerForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
          });
    }

    ngOnInit(): void {
      // window.alert('inside ngOnInit of customer details');
      this.activeRouter.params.subscribe(params => {
        this.customerId = params['id'];
        console.log('Customer ID:', this.customerId);
        if (this.customerId) {
          this.customerService.getById(this.customerId)
            .subscribe({
              next: (customer) => {
                this.isLoading = false; // Set loading to false after data is fetched
                this.customerDetails = customer;
                this.customerForm?.patchValue({
                  name: customer.name,
                  email: customer.email,
                  phone: customer.phone
                });
                console.log('Customer Details:', this.customerDetails);
              },
              error: (err) => {
                this.isLoading = false; // Set loading to false in case of error
                console.error('Error fetching customer details:', err);
              }
            });
          }
        });
    }

    onSubmit() {
      console.log('this.customerDetails', this.customerDetails);
      if (this.customerDetails) {
        this.customerService.put(this.customerDetails, this.customerId).subscribe(
          data => {
            console.log('Data updated successfully');
            // Navigate back to the customer list or details page
            // this.router.navigate(['/']);
          },
          error => {
            console.error('Error updating customer:', error);
          }
        );
      } else {
        alert('Please fill the form correctly.');
      }
    }

    onCancel() {
      // Logic to handle cancel action, e.g., navigate back to the customer list
      console.log('Edit cancelled');
      // this.router.navigate(['/list']);
    }
}
