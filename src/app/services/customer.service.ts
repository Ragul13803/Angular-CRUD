import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this.http.get('/api/getCustomers');
  }

  createCustomer(customer: any): Observable<any> {
    return this.http.post('/api/createCustomer', customer);
  }
}