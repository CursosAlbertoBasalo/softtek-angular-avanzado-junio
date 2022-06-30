import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoggerBaseService } from './logger-base.service';
import { LoggerPlusService } from './logger-plus.service';
import { LoggerService } from './logger.service';

function loggerFactory(): LoggerBaseService {
  if (environment.production) return new LoggerPlusService();
  else return new LoggerService();
}

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, HttpClientModule, RouterModule],
  exports: [HeaderComponent, FooterComponent],
  providers: [{ provide: LoggerBaseService, useFactory: loggerFactory }],
})
export class CoreModule {}
