import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, tap } from 'rxjs';

@Component({
  selector: 'stk-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter<string>();

  @ViewChild('searchInput', { static: true }) public searchInput!: ElementRef;

  // public searchTerm$!: Observable<unknown>;

  constructor() {}

  ngOnInit(): void {
    const nativeSource$ = fromEvent(this.searchInput.nativeElement, 'keyup');
    //this.searchTerm$ =
    nativeSource$
      .pipe(
        debounceTime(600),
        map((event: any) => (event as any).target.value as string),
        filter((searchTerm) => searchTerm.length > 2),
        distinctUntilChanged(),
        // map((texto) => ({ elTexto: texto })),
        // tap((objeto) => (objeto.elTexto = 'Gustavo')),
        // map((objeto) => objeto.elTexto),
        tap((searchTerm) => this.search.emit(searchTerm))
      )
      .subscribe();
  }
}
