import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() public placeholder: string = 'searchs...';

  
}
