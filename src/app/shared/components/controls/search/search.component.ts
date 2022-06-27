import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'stk-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter<string>();

  @ViewChild('searchInput', { static: true }) public searchInput!: ElementRef;

  public searchTerm$!: Observable<unknown>;

  constructor() {}

  ngOnInit(): void {
    const nativeSource$ = fromEvent(this.searchInput.nativeElement, 'keyup');
    this.searchTerm$ = nativeSource$.pipe(
      map((event: any) => (event as any).target.value as string),
      debounceTime(600),
      filter((searchTerm) => searchTerm.length > 2),
      distinctUntilChanged(),
      tap((searchTerm) => this.search.emit(searchTerm))
    );
  }
}
