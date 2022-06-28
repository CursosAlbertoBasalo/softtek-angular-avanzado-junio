import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@stk/shared/shared.module';
import { TripsRoutingModule } from './trips-routing.module';
import { TripsComponent } from './trips.component';

@NgModule({
  declarations: [TripsComponent],
  imports: [CommonModule, TripsRoutingModule, SharedModule],
})
export class TripsModule {}
