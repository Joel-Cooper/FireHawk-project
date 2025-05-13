import { Component, input } from '@angular/core';
import { Automobile } from '../../model/automobile.type';

@Component({
  selector: 'app-data-item',
  imports: [],
  templateUrl: './data-item.component.html',
  styleUrl: './data-item.component.scss'
})
export class DataItemComponent {
  automobile = input.required<Automobile>();
}
