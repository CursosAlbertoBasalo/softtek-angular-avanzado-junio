import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmailComponent } from './components/controls/email/email.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ErrorComponent } from './components/error/error.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PreviewComponent } from './components/preview/preview.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { ResponseComponent } from './components/response/response.component';
import { TemplateComponent } from './components/controls/template/template.component';
import { SearchComponent } from './components/controls/search/search.component';

@NgModule({
  declarations: [
    LoadingComponent,
    ErrorComponent,
    EmptyComponent,
    RefreshComponent,
    PreviewComponent,
    ResponseComponent,
    EmailComponent,
    TemplateComponent,
    SearchComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    LoadingComponent,
    ErrorComponent,
    EmptyComponent,
    RefreshComponent,
    PreviewComponent,
    ResponseComponent,
    EmailComponent,
    ReactiveFormsModule,
    RouterModule,
    TemplateComponent,
    SearchComponent,
  ],
})
export class SharedModule {}
