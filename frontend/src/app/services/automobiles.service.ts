import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Automobile } from '../model/automobile.type';

@Injectable({
  providedIn: 'root'
})
export class AutomobilesService {
  http = inject(HttpClient);
  
  getAutomobilesFromApi() {
    const url = 'http://localhost:8080/automobiles';
    return this.http.get<{ data: Array<Automobile> }>(url);
  }
}
