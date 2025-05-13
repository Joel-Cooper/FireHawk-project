import { Pipe, PipeTransform } from '@angular/core';
import { Automobile } from '../model/automobile.type';

@Pipe({
  name: 'filterAutomobiles'
})
export class FilterAutomobilesPipe implements PipeTransform {

  transform(automobiles: Automobile[], searchTerm: string): Automobile[] {
    if (!searchTerm){
      return automobiles;
    }
    const text = searchTerm.toLowerCase();
    return automobiles.filter(automobile => {
      return automobile.name.toLowerCase().includes(text);
    });
  }

}
