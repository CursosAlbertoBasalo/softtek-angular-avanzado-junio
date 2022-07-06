import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
  selector: 'stk-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  // title = 'softtek-angular-avanzado-abril';

  public newVersion = '';

  constructor(swUpdate: SwUpdate, @Inject(PLATFORM_ID) platformId: object) {
    if (isPlatformBrowser(platformId)) {
      swUpdate.versionUpdates.subscribe((event: VersionEvent) => {
        if (event.type === 'VERSION_READY') {
          const version = event.latestVersion;
          this.newVersion = version.appData ? JSON.stringify(version.appData) : version.hash;
        }
      });
      interval(1000 * 60).subscribe(() => swUpdate.checkForUpdate());
    }
  }

  public onReload() {
    window.location.reload();
  }
}
