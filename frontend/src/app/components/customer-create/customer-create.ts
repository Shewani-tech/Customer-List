import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CustomerService } from '../../services/customer';
import { Router } from '@angular/router';



@Component({
  selector: 'app-customer-create',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './customer-create.html',
  styleUrl: './customer-create.scss',
  standalone: true
})
export class CustomerCreate implements OnInit {
  myForm: FormGroup;
  service = inject(CustomerService);
  router= inject(Router);

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  ngOnInit(): void {
    console.log('inside ngOnInit');

  }
  onSubmit() {
    console.log('this.myForm', this.myForm.value);

    if (this.myForm.valid) {
          this.service.post(this.myForm.value).subscribe(
            data=>{
              console.log('Data added successfully');
              this.router.navigate(['/']);
              
            }
            ,error=>{
              console.log(error);
              
            }
          );
      alert('Form submitted successfully!');
    } else {
      alert('Please fill the form correctly.');
    }
  }



}


