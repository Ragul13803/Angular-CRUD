import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Customer List</h1>
    <div class="btn-container">
      <button class="btn">(+) Add Customer</button>
    </div>
    <div class="card-container">
      <div class="card" *ngFor="let customer of customers">
        <div class="img-container">
          <h2>{{ customer.name[0] | uppercase }}</h2>
        </div>
        <h2>{{ customer.name }}</h2>
        <p><strong>Age:</strong> {{ customer.age }}</p>
        <p><strong>Gender:</strong> {{ customer.gender }}</p>
        <p><strong>Email:</strong> {{ customer.gmail }}</p>
        <p><strong>Mobile:</strong> {{ customer.mobile }}</p>
      </div>
    </div>
  `,
  styles: [`
    h1 {
      margin-bottom: 20px;
      text-align: center;
    }

    .card-container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
    }

    .img-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
    }

    .img-container h2 {
      height: 80px;
      width: 80px;
      border-radius: 50%;
      background-color: #ffffff;
      color: #000000;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32px;
      font-weight: bold;
      margin: 0;
    }

    .card {
      border: 1px solid #ccc;
      padding: 16px;
      border-radius: 10px;
      width: 280px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s ease;
      background-color: #F38C79;
    }

    // .card:hover {
    //   transform: translateY(-5px);
    // }

    .card h2 {
      margin-top: 0;
      color: #205781;
      display: flex;
      justify-content: center;
    }

    .card p {
      margin: 6px 0;
      color: #205781;
    }

    .btn-container{
      display: flex;
      justify-content:flex-end;
      margin: 10px;
    }
    .btn {
      background-color: #205781;
      color: white;
      padding: 8px;
      border-radius: 6px;
    }
  `]
})
export class AppComponent implements OnInit {
  customers: any[] = [];
  private customerService = inject(CustomerService);

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data as any[];
    });
  }
}
