import { Component, inject, signal } from '@angular/core';
import { DataItemComponent } from '../components/data-item/data-item.component';
import { AutomobilesService } from '../services/automobiles.service';
import { Automobile } from '../model/automobile.type';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FilterAutomobilesPipe } from '../pipes/filter-automobiles.pipe';
import { SortAutomobilesPipe } from '../pipes/sort-automobiles.pipe';

@Component({
  selector: 'app-data-display',
  imports: [
    DataItemComponent, 
    FormsModule, 
    FilterAutomobilesPipe,
    SortAutomobilesPipe
  ],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.scss'
})
export class DataDisplayComponent {
  automobileService = inject(AutomobilesService);
  automobileItems = signal<Array<Automobile>>([]);

  searchTerm = signal('');
  sortField = signal<keyof Automobile>('name');
  sortOrder = signal(<'ascending' | 'descending'>('ascending'));

  ngOnInit(): void {
    this.automobileService.getAutomobilesFromApi()
    .pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    )
    .subscribe((response) => {
      const cleanedData = response.data.map(item => ({
      ...item,
      mpg: Number(item.mpg),
      cylinders: Number(item.cylinders),
      displacement: Number(item.displacement),
      horsepower: Number(item.horsepower),
      weight: Number(item.weight),
      acceleration: Number(item.acceleration),
      model_year: Number(item.model_year),
    }));

      this.automobileItems.set(cleanedData);
    });
  }
}
