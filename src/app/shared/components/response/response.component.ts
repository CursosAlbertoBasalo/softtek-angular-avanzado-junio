import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Response } from '@stk/models/response.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'stk-response',
  templateUrl: './response.component.html',
  styles: [],
})
export class ResponseComponent implements OnInit {
  @Input() public response$!: Observable<Response<any>>;
  @Input() public name = '';
  @Output() public reload = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
