import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '../core/api/authenticated.guard';
import { AgenciesComponent } from './agencies.component';
import { AgenciesResolver } from './agencies.resolver';

const routes: Routes = [
  {
    path: '',
    component: AgenciesComponent,
    data: {
      name: '🏨 Agencies',
    },
    resolve: {
      agencies: AgenciesResolver,
    },
  },
  {
    path: 'new',
    canLoad: [AuthenticatedGuard],
    loadChildren: () => import('./new/new.module').then((m) => m.NewModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenciesRoutingModule {}
