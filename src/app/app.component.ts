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
  
  popoverPosition = { top: 0, left: 0 };
  selectedCustomerIndex: number | null = null;

  openPopover(event: MouseEvent, index: number) {
    event.stopPropagation(); // Prevent closing immediately if body click handler exists
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
  
    this.popoverPosition = {
      top: rect.top + window.scrollY + 20,
      left: rect.left + window.scrollX
    };
    this.selectedCustomerIndex = index;
  }
  
  togglePopover(index: number) {
    this.selectedCustomerIndex = this.selectedCustomerIndex === index ? null : index;
  }

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

  editCustomer(index: number) {
    const customer = this.customers[index];
    this.newCustomer = { ...customer };
    this.openDialog = true;
    this.selectedCustomerIndex = null;
  }
  
  deleteCustomer(index: number) {
    const id = this.customers[index].id; // adjust based on your actual ID field
    // this.customerService.deleteCustomer(id).subscribe(() => {
    //   this.fetchCustomers();
    //   this.selectedCustomerIndex = null;
    // });
  }
}