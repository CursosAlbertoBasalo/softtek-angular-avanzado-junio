import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stk-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  public title = 'Softtek';
  constructor() {}

  ngOnInit(): void {}
}
