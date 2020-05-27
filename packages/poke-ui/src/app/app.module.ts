import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { environment } from '../environments/environment'

import {
  bootConfigServiceProvider,
  CONFIG_URL_TOKEN,
  ConfigService,
} from '@poke-app/ng-config-service'
import {
  SERVICE_URL_TOKEN,
} from '@poke-app/ng-api-services'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: SERVICE_URL_TOKEN,
      useFactory: (configService: ConfigService): string =>
        configService.get('apiUrl') ?? 'eff',
      deps: [ ConfigService ],
    },
    {
      provide: CONFIG_URL_TOKEN,
      useValue: `assets/config/${
        environment.production ? 'config' : 'config.local'
      }.json`,
    },
    bootConfigServiceProvider,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
