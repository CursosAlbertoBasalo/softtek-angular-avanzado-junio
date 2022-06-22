import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@stk/shared/shared.module';
import { AgenciesListComponent } from './agencies-list/agencies-list.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TripsListComponent } from './trips-list/trips-list.component';

@NgModule({
  declarations: [HomeComponent, AgenciesListComponent, TripsListComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
