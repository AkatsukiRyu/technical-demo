import { Component, Input } from '@angular/core';
import { SearchConfigurationModel } from 'd-library/forms/interfaces/search.model';

@Component({
  selector: 'lib-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() public placeholder: string = 'searchs...';
  @Input() public configuration!: SearchConfigurationModel;
  
  public searchValues!: string;


  public onSearchs(): void {
    const { data, searchBys, callback, prequisitionType } = this.configuration;

    if (!this.searchValues) {
      callback(data);
      return;
    }


    const andSearchs = (item: any): boolean => {
      const keys: string[] = [...searchBys];
      let matched = true;

      while(keys.length) {
        const key = keys.shift();

        // Just tired not sure this.
        if (!key) {
          continue;
        }

        if (item[key].toLowerCase().includes(this.searchValues.toLowerCase())) {
          continue;
        }

        matched = false;
        break;
      }

      return matched;
    }

    const orSearchs = (item: any): boolean => {
      const keys = [...searchBys];

      let matched = false;

      while(keys.length && matched === false) {
        const key = keys.shift();

        // Just tired not sure this.
        if (!key) {
          continue;
        }

        if (item[key].toLowerCase().includes(this.searchValues.toLowerCase())) {
          matched = true;
          break;
        }
      }

      return matched;
    }

    const items = data.filter(it => {
      if (prequisitionType === 'AND'){
        return andSearchs(it);
      }

      return orSearchs(it);
    });

    callback(items);
  }
}
