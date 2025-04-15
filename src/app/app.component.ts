import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  customers: any[] = [];
  openDialog = false;

  newCustomer = {
    name: '',
    age: '',
    gender: '',
    mobile: '',
    gmail: ''
  };

  private customerService = inject(CustomerService);

  ngOnInit(): void {
    this.fetchCustomers();
  }
  
  fetchCustomers(): void {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data as any[];
    });
  }
  
  addCustomer() {
    if (this.newCustomer.name && this.newCustomer.age && this.newCustomer.gender &&
        this.newCustomer.mobile && this.newCustomer.gmail) {
      this.customerService.createCustomer(this.newCustomer).subscribe({
        next: (res) => {
          this.fetchCustomers(); // 👈 Fetch fresh list after POST
          this.customers.push({ ...this.newCustomer }); // Optimistic UI update
          this.newCustomer = { name: '', age: '', gender: '', mobile: '', gmail: '' };
          this.openDialog = false;
        },
        error: (err) => {
          console.error('Error creating customer:', err);
          alert('Failed to add customer');
        }
      });
    }
  }
}
