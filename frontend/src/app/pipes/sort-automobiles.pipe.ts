import { Pipe, PipeTransform } from '@angular/core';
import { Automobile } from '../model/automobile.type';

@Pipe({
  name: 'sortAutomobiles'
})
export class SortAutomobilesPipe implements PipeTransform {

  transform(automobiles: Automobile[], field: keyof Automobile, order: 'ascending' | 'descending'): Automobile[] {
    if (!field || !order) return automobiles;

    return [...automobiles].sort((a, b) => {
      const valA = a[field];
      const valB = b[field];

      if (typeof valA === 'number' && typeof valB === 'number'){
        return order === 'ascending' ? valA -valB : valB - valA;
      } else {
        return order === 'ascending' 
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
      }
    })
  }
}
