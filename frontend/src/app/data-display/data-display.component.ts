import { Component, inject, signal } from '@angular/core';
import { DataItemComponent } from '../components/data-item/data-item.component';
import { AutomobilesService } from '../services/automobiles.service';
import { Automobile } from '../model/automobile.type';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-data-display',
  imports: [DataItemComponent],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.scss'
})
export class DataDisplayComponent {
  automobileService = inject(AutomobilesService);
  automobileItems = signal<Array<Automobile>>([]);

  ngOnInit(): void {
    this.automobileService.getAutomobilesFromApi()
    .pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    )
    .subscribe((response) => {
      this.automobileItems.set(response.data);
    });
  }
}
