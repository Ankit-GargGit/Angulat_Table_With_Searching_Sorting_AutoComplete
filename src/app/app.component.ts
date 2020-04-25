import { Component, QueryList, ViewChildren } from "@angular/core";
import {DecimalPipe} from '@angular/common';
import { Observable } from "rxjs";


import {CountryService} from './games.service';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';
import { Game } from './game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CountryService, DecimalPipe]
})
export class AppComponent {
  games$: Observable<Game[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: CountryService) {
    this.games$ = service.games$;
    this.total$ = service.total$;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
